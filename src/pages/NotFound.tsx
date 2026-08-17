import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { CTASection } from '../components/CTASection';
import { useSeo } from '../hooks/useSeo';

export function NotFound() {
  useSeo({
    title: 'Page Not Found | R.M. Engineering',
    description: 'The page you are looking for is not available on the R.M. Engineering website.'
  });

  return (
    <>
      <PageHero
        eyebrow="404"
        title="This page isn’t in the catalogue"
        description="The page you were looking for has moved or does not exist. Start from the product catalogue or browse by vehicle brand." />
      
      <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-4 py-12 sm:px-6 lg:px-8">
        <Link
          to="/products"
          className="inline-flex h-12 items-center justify-center bg-ink-900 px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-150 ease-industrial hover:bg-accent">
          
          Product Catalogue
        </Link>
        <Link
          to="/vehicles"
          className="inline-flex h-12 items-center justify-center border border-steel-300 px-6 text-xs font-semibold uppercase tracking-[0.14em] text-ink-900 transition-colors duration-150 ease-industrial hover:border-ink-900">
          
          Vehicle Applications
        </Link>
      </div>
      <CTASection />
    </>);

}