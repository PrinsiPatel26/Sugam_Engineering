import React, { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { categories } from '../data/categories';
import { brands, modelsForBrand, products as allProducts, segments } from '../data/products';
import type { CategoryId, ProductFilterState, VehicleSegment } from '../types/catalogue';

export const emptyFilters: ProductFilterState = {
  query: '',
  categories: [],
  brands: [],
  models: [],
  segments: []
};

interface FilterPanelProps {
  state: ProductFilterState;
  onChange: (next: ProductFilterState) => void;
  hideCategories?: boolean;
  hideBrands?: boolean;
  resultCount: number;
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function Checkbox({
  label,
  count,
  checked,
  onChange





}: {label: string;count?: number;checked: boolean;onChange: () => void;}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 py-1.5 text-sm text-ink-800 transition-colors duration-150 ease-industrial hover:text-accent">
      <span className="flex items-center gap-2.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 border-steel-300 text-accent focus:ring-accent" />
        
        {label}
      </span>
      {typeof count === 'number' &&
      <span className="font-mono text-[11px] text-steel-400">{count}</span>
      }
    </label>);

}

function Group({ title, children }: {title: string;children: React.ReactNode;}) {
  return (
    <div className="border-t border-steel-200 py-5 first:border-t-0 first:pt-0">
      <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-steel-500">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>);

}

export function FilterPanel({
  state,
  onChange,
  hideCategories,
  hideBrands,
  resultCount
}: FilterPanelProps) {
  const modelOptions = useMemo(() => {
    const selectedBrands = state.brands.length ? state.brands : [];
    if (!selectedBrands.length) return [];
    return selectedBrands.flatMap((brandSlug) => modelsForBrand(brandSlug));
  }, [state.brands]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allProducts.forEach((product) => {
      counts[product.category] = (counts[product.category] ?? 0) + 1;
    });
    return counts;
  }, []);

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allProducts.forEach((product) => {
      counts[product.brandSlug] = (counts[product.brandSlug] ?? 0) + 1;
    });
    return counts;
  }, []);

  const hasFilters =
  state.categories.length || state.brands.length || state.models.length || state.segments.length;

  return (
    <div>
      <div className="flex items-center justify-between border-b border-steel-200 pb-4">
        <p className="font-display text-lg uppercase tracking-wide text-ink-900">Filters</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-steel-500">
          {resultCount} items
        </p>
      </div>

      <div className="pt-5">
        {!hideCategories &&
        <Group title="Product Category">
            {categories.map((category) =>
          <Checkbox
            key={category.id}
            label={category.name}
            count={categoryCounts[category.id]}
            checked={state.categories.includes(category.id)}
            onChange={() =>
            onChange({
              ...state,
              categories: toggle<CategoryId>(state.categories, category.id)
            })
            } />

          )}
          </Group>
        }

        {!hideBrands &&
        <Group title="Vehicle Brand">
            <div className="max-h-64 overflow-y-auto pr-1">
              {brands.map((brand) =>
            <Checkbox
              key={brand.slug}
              label={brand.name}
              count={brandCounts[brand.slug]}
              checked={state.brands.includes(brand.slug)}
              onChange={() =>
              onChange({
                ...state,
                brands: toggle(state.brands, brand.slug),
                models: []
              })
              } />

            )}
            </div>
          </Group>
        }

        {modelOptions.length > 0 &&
        <Group title="Vehicle Model">
            <div className="max-h-64 overflow-y-auto pr-1">
              {modelOptions.map((model) =>
            <Checkbox
              key={`${model.brandSlug}-${model.modelSlug}`}
              label={model.model}
              count={model.count}
              checked={state.models.includes(model.modelSlug)}
              onChange={() => onChange({ ...state, models: toggle(state.models, model.modelSlug) })} />

            )}
            </div>
          </Group>
        }

        <Group title="Vehicle Segment">
          {segments.map((segment) =>
          <Checkbox
            key={segment}
            label={segment}
            checked={state.segments.includes(segment)}
            onChange={() =>
            onChange({ ...state, segments: toggle<VehicleSegment>(state.segments, segment) })
            } />

          )}
        </Group>

        {hasFilters ?
        <button
          type="button"
          onClick={() => onChange({ ...emptyFilters, query: state.query })}
          className="mt-2 w-full border border-steel-300 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-900 transition-colors duration-150 ease-industrial hover:border-ink-900 hover:bg-steel-50">
          
            Clear all filters
          </button> :
        null}
      </div>
    </div>);

}

interface MobileFilterDrawerProps extends FilterPanelProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function MobileFilterDrawer({ open, onOpen, onClose, ...panel }: MobileFilterDrawerProps) {
  const activeCount =
  panel.state.categories.length +
  panel.state.brands.length +
  panel.state.models.length +
  panel.state.segments.length;

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={onOpen}
        className="inline-flex h-11 w-full items-center justify-center gap-2 border border-steel-300 bg-white text-xs font-semibold uppercase tracking-[0.14em] text-ink-900">
        
        <SlidersHorizontalIcon className="h-4 w-4" />
        Filters{activeCount ? ` (${activeCount})` : ''}
      </button>

      <AnimatePresence>
        {open &&
        <div className="fixed inset-0 z-[90] flex">
            <motion.div
            className="absolute inset-0 bg-ink-950/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            onClick={onClose} />
          
            <motion.aside
            className="relative ml-auto h-full w-[86%] max-w-sm overflow-y-auto bg-white p-5"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            aria-label="Product filters">
            
              <div className="mb-4 flex items-center justify-between">
                <p className="font-display text-xl uppercase tracking-wide text-ink-900">Filters</p>
                <button
                type="button"
                onClick={onClose}
                aria-label="Close filters"
                className="border border-steel-300 p-2 text-ink-900">
                
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
              <FilterPanel {...panel} />
              <button
              type="button"
              onClick={onClose}
              className="mt-6 h-12 w-full bg-accent text-xs font-semibold uppercase tracking-[0.14em] text-white">
              
                Show {panel.resultCount} products
              </button>
            </motion.aside>
          </div>
        }
      </AnimatePresence>
    </div>);

}