import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';
import { ProductGrid } from '../ProductGrid';
import { featuredProducts } from '../../data/products';

export function FeaturedProducts() {
  return (
    <section className="border-y border-steel-200 bg-steel-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Fast Moving Applications"
          title="Frequently enquired components"
          description="A snapshot of high-demand applications. The full catalogue covers many more models across every brand we supply."
          action={
          <Link
            to="/products"
            className="inline-flex h-11 items-center gap-2 border border-steel-300 bg-white px-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-900 transition-colors duration-150 ease-industrial hover:border-ink-900">
            
              Browse All Products
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          } />
        
        <div className="mt-12">
          <ProductGrid products={featuredProducts} />
        </div>
      </div>
    </section>);

}