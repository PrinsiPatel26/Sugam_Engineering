import { catalogueByCategory } from './catalogue';
import { categoryById } from './categories';
import { buildBrand } from './brands';
import { images } from './images';
import { slugify } from '../utils/slug';
import type {
  Brand,
  CategoryId,
  Product,
  ProductFilterState,
  VehicleSegment } from
'../types/catalogue';

const commercialModels = [
'ace',
'super ace',
'207',
'winger',
'yodha',
'intra',
'zip',
'maxximo',
'supro',
'kargo king',
'toofan',
'traveller',
'trax',
'judo',
'cruiser',
'dost',
'bada dost',
'partner',
'super carry',
'van'];


const threeWheelerModels = ['jeeto', 'iris'];

const utilityModels = [
'bolero',
'scorpio',
'thar',
'safari',
'sumo',
'xylo',
'xuv 500',
'xuv 300',
'kuv 100',
'marazzo',
'm-hawk',
'innova',
'innova crysta',
'qualis',
'fortuner',
'tavera',
'enjoy',
'captiva',
'duster',
'terrano',
'ecosport',
'creta',
'brezza',
's-cross',
'ertiga',
'nexon',
'punch',
'hexa',
'lodgy',
'triber',
'magnite',
'wr-v'];


function segmentFor(model: string, variant?: string): VehicleSegment {
  const key = model.toLowerCase();
  const variantKey = (variant ?? '').toLowerCase();
  if (threeWheelerModels.some((m) => key.includes(m) || variantKey.includes(m))) {
    return 'Three Wheeler';
  }
  if (commercialModels.includes(key)) return 'Commercial Vehicle';
  if (utilityModels.includes(key)) return 'Utility Vehicle';
  return 'Passenger Vehicle';
}

function materialFor(category: CategoryId): string {
  return category === 'wheel-hub' ? 'Cast Iron / Machined Steel' : 'Cast Iron';
}

function productTypeFor(category: CategoryId, variant?: string): string {
  if (category === 'wheel-hub') return variant?.replace(/ N\/M$/, '') ?? 'Wheel Hub';
  if (category === 'brake-drum') return 'Brake Drum';
  return 'Disc Brake Rotor';
}

function descriptionFor(categoryName: string, application: string, segment: VehicleSegment): string {
  return `${categoryName} manufactured by R.M. Engineering for ${application} applications. Machined for dimensional accuracy and balanced running, and supplied as a replacement component for ${segment.toLowerCase()} fitment.`;
}

function buildProducts(): Product[] {
  const list: Product[] = [];

  (Object.keys(catalogueByCategory) as CategoryId[]).forEach((categoryId) => {
    const category = categoryById[categoryId];
    catalogueByCategory[categoryId].forEach((block) => {
      const brand = buildBrand(block.brand);
      block.entries.forEach(([model, variant]) => {
        const modelSlug = slugify(model);
        const isHub = categoryId === 'wheel-hub';
        const application = variant ? `${brand.name} ${model} ${variant}` : `${brand.name} ${model}`;
        const name = isHub ?
        `${brand.name} ${model} ${variant ?? 'Wheel Hub'}` :
        `${application} ${category.name}`;
        const id = slugify(`${brand.name} ${model} ${variant ?? ''} ${category.name}`);
        const segment = segmentFor(model, variant);

        list.push({
          id,
          name,
          category: categoryId,
          categoryName: category.name,
          brand: brand.name,
          brandSlug: brand.slug,
          model,
          modelSlug,
          application,
          material: materialFor(categoryId),
          productType: productTypeFor(categoryId, variant),
          segment,
          description: descriptionFor(category.name, application, segment),
          specifications: {
            'Product Category': category.name,
            'Vehicle Brand': brand.name,
            'Vehicle Model': model,
            Application: application,
            'Product Type': productTypeFor(categoryId, variant),
            Material: materialFor(categoryId),
            'Vehicle Segment': segment,
            'Surface Finish': 'Machined',
            'Supply Type': 'Replacement / Aftermarket',
            Packaging: 'Standard packing · custom packing on request',
            'Minimum Order Quantity': 'Shared on inquiry',
            Availability: 'Available on inquiry'
          },
          images:
          categoryId === 'brake-disc' ?
          [images.brakeDisc, images.machining, images.packaging] :
          categoryId === 'brake-drum' ?
          [images.brakeDrum, images.machining, images.packaging] :
          [images.wheelHub, images.machining, images.packaging],
          tags: [
          brand.name,
          model,
          variant ?? '',
          category.name,
          segment,
          'brake components',
          'manufacturer'].
          filter(Boolean)
        });
      });
    });
  });

  return list;
}

export const products: Product[] = buildProducts();

const featuredIds = new Set([
'tata-ace-brake-disc',
'mahindra-bolero-n-m-brake-disc',
'maruti-suzuki-swift-n-m-brake-disc',
'hyundai-creta-brake-disc',
'toyota-innova-brake-disc',
'tata-ace-brake-drum',
'ashok-leyland-dost-brake-drum',
'mahindra-bolero-front-pickup-hub-wheel-hub']
);

products.forEach((product) => {
  if (featuredIds.has(product.id)) product.featured = true;
});

export const featuredProducts = products.filter((product) => product.featured);

export const brands: Brand[] = (() => {
  const seen = new Map<string, Brand>();
  products.forEach((product) => {
    if (!seen.has(product.brandSlug)) seen.set(product.brandSlug, buildBrand(product.brand));
  });
  return Array.from(seen.values());
})();

export function getBrand(slug: string): Brand | undefined {
  return brands.find((brand) => brand.slug === slug);
}

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function productsByBrand(brandSlug: string): Product[] {
  return products.filter((product) => product.brandSlug === brandSlug);
}

export function productsByCategory(categoryId: CategoryId): Product[] {
  return products.filter((product) => product.category === categoryId);
}

export function countByCategory(categoryId: CategoryId): number {
  return productsByCategory(categoryId).length;
}

export interface ModelSummary {
  model: string;
  modelSlug: string;
  brandSlug: string;
  count: number;
  categories: CategoryId[];
  segment: VehicleSegment;
}

export function modelsForBrand(brandSlug: string): ModelSummary[] {
  const map = new Map<string, ModelSummary>();
  productsByBrand(brandSlug).forEach((product) => {
    const existing = map.get(product.modelSlug);
    if (existing) {
      existing.count += 1;
      if (!existing.categories.includes(product.category)) existing.categories.push(product.category);
      return;
    }
    map.set(product.modelSlug, {
      model: product.model,
      modelSlug: product.modelSlug,
      brandSlug: product.brandSlug,
      count: 1,
      categories: [product.category],
      segment: product.segment
    });
  });
  return Array.from(map.values()).sort((a, b) => a.model.localeCompare(b.model));
}

export function productsByModel(brandSlug: string, modelSlug: string): Product[] {
  return products.filter(
    (product) => product.brandSlug === brandSlug && product.modelSlug === modelSlug
  );
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  const sameModel = products.filter(
    (item) =>
    item.id !== product.id &&
    item.brandSlug === product.brandSlug &&
    item.modelSlug === product.modelSlug
  );
  const sameBrand = products.filter(
    (item) =>
    item.id !== product.id &&
    item.brandSlug === product.brandSlug &&
    item.modelSlug !== product.modelSlug &&
    item.category === product.category
  );
  return [...sameModel, ...sameBrand].slice(0, limit);
}

function haystack(product: Product): string {
  return `${product.name} ${product.application} ${product.categoryName} ${product.productType} ${product.segment} ${product.tags.join(' ')}`.toLowerCase();
}

export function searchProducts(query: string, limit?: number): Product[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return limit ? products.slice(0, limit) : products;
  const matches = products.filter((product) => {
    const text = haystack(product);
    return terms.every((term) => text.includes(term));
  });
  return limit ? matches.slice(0, limit) : matches;
}

export function filterProducts(state: ProductFilterState): Product[] {
  let result = searchProducts(state.query);
  if (state.categories.length) {
    result = result.filter((product) => state.categories.includes(product.category));
  }
  if (state.brands.length) {
    result = result.filter((product) => state.brands.includes(product.brandSlug));
  }
  if (state.models.length) {
    result = result.filter((product) => state.models.includes(product.modelSlug));
  }
  if (state.segments.length) {
    result = result.filter((product) => state.segments.includes(product.segment));
  }
  return result;
}

export const segments: VehicleSegment[] = [
'Passenger Vehicle',
'Utility Vehicle',
'Commercial Vehicle',
'Three Wheeler'];


export const catalogueStats = {
  products: products.length,
  brands: brands.length,
  categories: Object.keys(catalogueByCategory).length,
  models: new Set(products.map((product) => `${product.brandSlug}-${product.modelSlug}`)).size
};