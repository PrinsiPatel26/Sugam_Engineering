import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { ProductGrid } from '../components/ProductGrid';
import { FilterPanel, MobileFilterDrawer, emptyFilters } from '../components/ProductFilters';
import { CTASection } from '../components/CTASection';
import { filterProducts } from '../data/products';
import { useSeo } from '../hooks/useSeo';
import type { ProductFilterState } from '../types/catalogue';

export function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilterState>({ ...emptyFilters, query });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, query }));
  }, [query]);

  const results = useMemo(() => filterProducts(filters), [filters]);

  useSeo({
    title: query ?
    `Search: ${query} | R.M. Engineering` :
    'Search the Catalogue | R.M. Engineering',
    description:
    'Search the R.M. Engineering catalogue of automotive brake discs, brake drums and wheel hubs by vehicle model, brand or component.'
  });

  const panelProps = {
    state: filters,
    onChange: setFilters,
    resultCount: results.length
  };

  return (
    <>
      <PageHero
        eyebrow="Catalogue Search"
        title={query ? `Results for “${query}”` : 'Search the catalogue'}
        description={`${results.length} matching ${results.length === 1 ? 'application' : 'applications'} found.`}
        crumbs={[{ label: 'Search' }]} />
      

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28 border border-steel-200 bg-white p-5">
              <FilterPanel {...panelProps} />
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="mb-6 flex items-center gap-2 border border-steel-300 bg-white px-3">
              <SearchIcon className="h-4 w-4 text-steel-500" aria-hidden="true" />
              <label htmlFor="results-search" className="sr-only">
                Refine search
              </label>
              <input
                id="results-search"
                value={filters.query}
                onChange={(event) => {
                  setFilters({ ...filters, query: event.target.value });
                  setSearchParams(
                    event.target.value ? { q: event.target.value } : {},
                    { replace: true }
                  );
                }}
                placeholder="Search “Tata Ace”, “Scorpio”, “Brake Drum”"
                className="h-11 w-full bg-transparent text-sm text-ink-900 placeholder:text-steel-400 focus:outline-none" />
              
            </div>

            <div className="mb-6">
              <MobileFilterDrawer
                {...panelProps}
                open={drawerOpen}
                onOpen={() => setDrawerOpen(true)}
                onClose={() => setDrawerOpen(false)} />
              
            </div>

            <ProductGrid products={results} columns={3} />
          </div>
        </div>
      </div>

      <CTASection />
    </>);

}