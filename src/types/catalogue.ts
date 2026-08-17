export type CategoryId = 'brake-disc' | 'brake-drum' | 'wheel-hub';

export type VehicleSegment =
'Passenger Vehicle' |
'Utility Vehicle' |
'Commercial Vehicle' |
'Three Wheeler';

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  image: string;
  bullets: string[];
}

export interface Brand {
  slug: string;
  name: string;
  shortName: string;
  origin: string;
}

export interface Product {
  /** Stable, SEO friendly id — also used as the /product/:id route param */
  id: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  brand: string;
  brandSlug: string;
  model: string;
  modelSlug: string;
  application: string;
  /** Undefined when the catalogue does not publish a part number for this item */
  partNumber?: string;
  material: string;
  productType: string;
  segment: VehicleSegment;
  description: string;
  specifications: Record<string, string>;
  images: string[];
  tags: string[];
  featured?: boolean;
}

export interface ProductFilterState {
  query: string;
  categories: CategoryId[];
  brands: string[];
  models: string[];
  segments: VehicleSegment[];
}