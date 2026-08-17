import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';
import { BrandCard } from '../BrandCard';
import { brands, productsByBrand } from '../../data/products';

export function BrandStrip() {
  return (
    <section className="relative bg-ink-900">
      <div className="tech-grid absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          tone="dark"
          eyebrow="Vehicle Applications"
          title="Find your vehicle brand"
          description="Every application in the catalogue is mapped to a vehicle brand and model, so distributors and workshops can reach the right part in two clicks."
          action={
          <Link
            to="/vehicles"
            className="inline-flex h-11 items-center gap-2 border border-white/25 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-150 ease-industrial hover:border-white/60 hover:bg-white/10">
            
              All Vehicle Brands
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          } />
        

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((brand) =>
          <BrandCard
            key={brand.slug}
            brand={brand}
            count={productsByBrand(brand.slug).length}
            tone="dark" />

          )}
        </div>
      </div>
    </section>);

}