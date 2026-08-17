import React, { useMemo } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { ProductGrid } from '../components/ProductGrid';
import { SectionHeading } from '../components/SectionHeading';
import { CTASection } from '../components/CTASection';
import { categories } from '../data/categories';
import { getBrand, modelsForBrand, productsByBrand } from '../data/products';
import { useSeo } from '../hooks/useSeo';
import type { CategoryId } from '../types/catalogue';

export function VehicleBrand() {
  const { brand: brandSlug } = useParams<{brand: string;}>();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') as CategoryId | null;
  const brand = brandSlug ? getBrand(brandSlug) : undefined;

  const models = useMemo(() => brandSlug ? modelsForBrand(brandSlug) : [], [brandSlug]);
  const products = useMemo(() => {
    const list = brandSlug ? productsByBrand(brandSlug) : [];
    return categoryFilter ? list.filter((item) => item.category === categoryFilter) : list;
  }, [brandSlug, categoryFilter]);

  useSeo({
    title: brand ?
    `${brand.name} Brake Disc, Brake Drum & Wheel Hub | R.M. Engineering` :
    'Vehicle Brand | R.M. Engineering',
    description: brand ?
    `Brake components manufactured for ${brand.name} applications — brake discs, brake drums and wheel hubs across ${models.length} models. Enquire for availability and quotation.` :
    'Vehicle brand catalogue from R.M. Engineering.'
  });

  if (!brand) return <Navigate to="/vehicles" replace />;

  const categoriesForBrand = categories.filter((category) =>
  productsByBrand(brand.slug).some((product) => product.category === category.id)
  );

  return (
    <>
      <PageHero
        eyebrow="Vehicle Application"
        title={`${brand.name} Automotive Brake Components`}
        description={`${productsByBrand(brand.slug).length} catalogued ${brand.name} applications across ${categoriesForBrand.length} product lines. Select a model to see the exact parts we manufacture.`}
        crumbs={[{ label: 'Vehicle Applications', to: '/vehicles' }, { label: brand.name }]} />
      

      <section className="border-b border-steel-200 bg-steel-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel-500">
            Select Model
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {models.map((model) =>
            <Link
              key={model.modelSlug}
              to={`/vehicles/${brand.slug}/${model.modelSlug}`}
              className="group flex items-center justify-between border border-steel-200 bg-white px-4 py-3.5 transition-colors duration-200 ease-industrial hover:border-ink-900">
              
                <span className="font-display text-lg uppercase tracking-wide text-ink-900">
                  {model.model}
                </span>
                <ArrowRightIcon
                className="h-4 w-4 text-steel-400 transition-transform duration-200 ease-industrial group-hover:translate-x-0.5 group-hover:text-accent"
                aria-hidden="true" />
              
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Catalogue"
          title={`All ${brand.name} components`}
          description="Every catalogued application for this brand. Use the model buttons above to narrow down, or send an enquiry directly from any card." />
        

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            to={`/vehicles/${brand.slug}`}
            className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-150 ease-industrial ${
            categoryFilter ?
            'border-steel-300 text-ink-900 hover:border-ink-900' :
            'border-ink-900 bg-ink-900 text-white'}`
            }>
            
            All Parts
          </Link>
          {categoriesForBrand.map((category) =>
          <Link
            key={category.id}
            to={`/vehicles/${brand.slug}?category=${category.id}`}
            className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-150 ease-industrial ${
            categoryFilter === category.id ?
            'border-ink-900 bg-ink-900 text-white' :
            'border-steel-300 text-ink-900 hover:border-ink-900'}`
            }>
            
              {category.name}
            </Link>
          )}
        </div>

        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </div>

      <CTASection context={`${brand.name} brake components`} />
    </>);

}