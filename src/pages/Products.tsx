import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { ProductGrid } from '../components/ProductGrid';
import { FilterPanel, MobileFilterDrawer, emptyFilters } from '../components/ProductFilters';
import { CTASection } from '../components/CTASection';
import { categories, getCategory } from '../data/categories';
import { filterProducts, products } from '../data/products';
import { useSeo } from '../hooks/useSeo';
import type { CategoryId, ProductFilterState } from '../types/catalogue';

export function Products() {
  const { category } = useParams<{category?: string;}>();
  const [searchParams] = useSearchParams();
  const activeCategory = category ? getCategory(category) : undefined;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [filters, setFilters] = useState<ProductFilterState>(() => ({
    ...emptyFilters,
    query: searchParams.get('q') ?? '',
    categories: category ? [category as CategoryId] : [],
    brands: searchParams.get('brand') ? [searchParams.get('brand') as string] : []
  }));

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      categories: category ? [category as CategoryId] : []
    }));
  }, [category]);

  const results = useMemo(() => filterProducts(filters), [filters]);

  useSeo({
    title: activeCategory ?
    `${activeCategory.name} Manufacturer & Exporter | R.M. Engineering` :
    'Product Catalogue — Brake Disc, Brake Drum, Wheel Hub | R.M. Engineering',
    description: activeCategory ?
    `${activeCategory.description} Vehicle-wise ${activeCategory.name.toLowerCase()} applications from R.M. Engineering, Rajkot.` :
    'Browse the complete R.M. Engineering catalogue of automotive brake discs, brake drums and wheel hubs by product category, vehicle brand and vehicle model.'
  });

  if (category && !activeCategory) {
    return <Navigate to="/products" replace />;
  }

  const panelProps = {
    state: filters,
    onChange: setFilters,
    hideCategories: Boolean(activeCategory),
    resultCount: results.length
  };

  return (
    <>
      <PageHero
        eyebrow={activeCategory ? 'Product Category' : 'Product Catalogue'}
        title={activeCategory ? activeCategory.name : 'Automotive Brake Components Catalogue'}
        description={
        activeCategory ?
        activeCategory.description :
        `${products.length} catalogued applications across ${categories.length} product lines. Filter by category, vehicle brand, model and segment to reach the exact part.`
        }
        crumbs={
        activeCategory ?
        [{ label: 'Products', to: '/products' }, { label: activeCategory.name }] :
        [{ label: 'Products' }]
        } />
      

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28 border border-steel-200 bg-white p-5">
              <FilterPanel {...panelProps} />
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-2 border border-steel-300 bg-white px-3">
                <SearchIcon className="h-4 w-4 text-steel-500" aria-hidden="true" />
                <label htmlFor="catalogue-search" className="sr-only">
                  Search within catalogue
                </label>
                <input
                  id="catalogue-search"
                  value={filters.query}
                  onChange={(event) => setFilters({ ...filters, query: event.target.value })}
                  placeholder="Search model or part — “Bolero”, “Ace”, “Creta”"
                  className="h-11 w-full bg-transparent text-sm text-ink-900 placeholder:text-steel-400 focus:outline-none" />
                
              </div>
              <p className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-steel-500 sm:block">
                {results.length} of {products.length} products
              </p>
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

      <CTASection
        title="Can’t find the application?"
        description="Our catalogue extends beyond what is listed online. Share the vehicle brand, model and component and we will confirm availability." />
      
    </>);

}