import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { CTASection } from '../components/CTASection';
import { brands, modelsForBrand, productsByBrand } from '../data/products';
import { useSeo } from '../hooks/useSeo';

export function Vehicles() {
  useSeo({
    title: 'Vehicle Applications — Brake Components by Vehicle Brand | R.M. Engineering',
    description:
    'Browse automotive brake discs, brake drums and wheel hubs by vehicle brand — Tata, Mahindra, Maruti Suzuki, Hyundai, Toyota, Force, Ashok Leyland and more.'
  });

  return (
    <>
      <PageHero
        eyebrow="Vehicle Applications"
        title="Browse products by vehicle brand"
        description="Start with the vehicle. Pick a brand, then the model, and see every brake component we catalogue for that application."
        crumbs={[{ label: 'Vehicle Applications' }]} />
      

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="space-y-px border border-steel-200 bg-steel-200">
          {brands.map((brand) => {
            const models = modelsForBrand(brand.slug);
            return (
              <div key={brand.slug} className="bg-white p-6 lg:p-8">
                <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
                  <div className="lg:col-span-3">
                    <Link
                      to={`/vehicles/${brand.slug}`}
                      className="font-display text-2xl uppercase tracking-tight text-ink-900 transition-colors duration-150 ease-industrial hover:text-accent">
                      
                      {brand.name}
                    </Link>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-steel-500">
                      {brand.origin} · {productsByBrand(brand.slug).length} parts ·{' '}
                      {models.length} models
                    </p>
                  </div>
                  <div className="lg:col-span-9">
                    <ul className="flex flex-wrap gap-2">
                      {models.map((model) =>
                      <li key={model.modelSlug}>
                          <Link
                          to={`/vehicles/${brand.slug}/${model.modelSlug}`}
                          className="inline-flex items-center gap-2 border border-steel-200 px-3 py-1.5 text-xs text-ink-800 transition-colors duration-150 ease-industrial hover:border-ink-900 hover:bg-steel-50">
                          
                            {model.model}
                            <span className="font-mono text-[10px] text-steel-400">
                              {model.count}
                            </span>
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>);

          })}
        </div>

        <p className="mt-8 text-sm text-steel-600">
          Supplying a brand or model not listed here? Send us the vehicle details — our catalogue is
          wider than what is published online.
        </p>
      </div>

      <CTASection title="Tell us your vehicle application" />
    </>);

}