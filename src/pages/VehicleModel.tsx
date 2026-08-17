import React, { useMemo } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { ProductGrid } from '../components/ProductGrid';
import { CTASection } from '../components/CTASection';
import { WhatsAppButton, InquiryButton } from '../components/ActionButtons';
import { categoryById } from '../data/categories';
import { getBrand, productsByModel } from '../data/products';
import { useSeo } from '../hooks/useSeo';
import type { CategoryId } from '../types/catalogue';

export function VehicleModel() {
  const { brand: brandSlug, model: modelSlug } = useParams<{brand: string;model: string;}>();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') as CategoryId | null;
  const brand = brandSlug ? getBrand(brandSlug) : undefined;

  const products = useMemo(
    () => brandSlug && modelSlug ? productsByModel(brandSlug, modelSlug) : [],
    [brandSlug, modelSlug]
  );

  const modelName = products[0]?.model ?? modelSlug ?? '';

  const grouped = useMemo(() => {
    const map = new Map<CategoryId, typeof products>();
    products.
    filter((product) => !categoryFilter || product.category === categoryFilter).
    forEach((product) => {
      map.set(product.category, [...(map.get(product.category) ?? []), product]);
    });
    return Array.from(map.entries());
  }, [products, categoryFilter]);

  useSeo({
    title: brand ?
    `${brand.name} ${modelName} Brake Components | R.M. Engineering` :
    'Vehicle Model | R.M. Engineering',
    description: brand ?
    `Brake discs, brake drums and wheel hubs manufactured for ${brand.name} ${modelName}. Send a WhatsApp or email enquiry for availability, MOQ and quotation.` :
    'Vehicle model catalogue from R.M. Engineering.'
  });

  if (!brand || !products.length) return <Navigate to="/vehicles" replace />;

  return (
    <>
      <PageHero
        eyebrow={`${brand.name} Application`}
        title={`${brand.name} ${modelName}`}
        description={`${products.length} catalogued components for the ${brand.name} ${modelName}. Every part is supplied on enquiry with availability, MOQ and specifications confirmed by our team.`}
        crumbs={[
        { label: 'Vehicle Applications', to: '/vehicles' },
        { label: brand.name, to: `/vehicles/${brand.slug}` },
        { label: modelName }]
        }>
        
        <div className="flex flex-wrap gap-3">
          <InquiryButton
            context={`${brand.name} ${modelName} brake components`}
            label="Send Inquiry" />
          
          <WhatsAppButton
            context={`${brand.name} ${modelName} brake components`}
            variant="outlineLight"
            label="WhatsApp Inquiry" />
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {grouped.map(([categoryId, items]) =>
        <section key={categoryId}>
            <div className="flex items-baseline justify-between border-b border-steel-200 pb-4">
              <h2 className="font-display text-2xl uppercase tracking-wide text-ink-900">
                {categoryById[categoryId].name}
              </h2>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-steel-500">
                {items.length} {items.length === 1 ? 'part' : 'parts'}
              </span>
            </div>
            <div className="mt-8">
              <ProductGrid products={items} />
            </div>
          </section>
        )}
      </div>

      <CTASection context={`${brand.name} ${modelName} components`} />
    </>);

}