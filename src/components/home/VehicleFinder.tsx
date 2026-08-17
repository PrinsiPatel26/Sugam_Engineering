import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { brands, modelsForBrand, productsByModel } from '../../data/products';
import { categories } from '../../data/categories';

const selectClass =
'h-12 w-full rounded-lg border border-steel-300 bg-white/95 px-3 text-sm text-ink-900 transition-all duration-200 ease-industrial hover:border-steel-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:bg-steel-100 disabled:text-steel-500';
const labelClass = 'block font-mono text-[10px] uppercase tracking-[0.18em] text-steel-500';

export function VehicleFinder() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [category, setCategory] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const navigate = useNavigate();

  const models = useMemo(() => brand ? modelsForBrand(brand) : [], [brand]);
  const availableCategories = useMemo(() => {
    if (!brand || !model) return [];
    const categorySet = new Set(productsByModel(brand, model).map((product) => product.category));
    return categories.filter((item) => categorySet.has(item.id));
  }, [brand, model]);

  const canSubmit = Boolean(brand && model && category);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;
    navigate(`/vehicles/${brand}/${model}?category=${category}`);
  }

  return (
    <section className="relative -mt-px border-b border-steel-200 bg-steel-100/70">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.36, ease: [0.23, 1, 0.32, 1] }}
          className="relative overflow-hidden rounded-xl border border-steel-300/90 bg-gradient-to-b from-white to-steel-50 p-5 shadow-[0_12px_34px_rgba(10,14,24,0.08)] transition-shadow duration-200 ease-industrial hover:shadow-[0_14px_42px_rgba(10,14,24,0.1)] sm:p-6 lg:p-7">
          <div className="absolute left-0 top-0 h-[3px] w-20 bg-accent/90" aria-hidden="true" />
          <div className="flex flex-col gap-6">
            <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
              Find Your Vehicle Application
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.01em] text-ink-900 sm:text-[2.15rem]">
              Brand → Model → Part
            </h2>
              <p className="mt-3 max-w-2xl text-sm text-steel-600">
                Select vehicle brand, model and category to quickly locate the exact part application.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid w-full gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
              <motion.div
                animate={{ y: focusedField === 'brand' ? -1 : 0 }}
                transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}>
              <label className={labelClass} htmlFor="finder-brand">
                Vehicle Brand
              </label>
              <select
                id="finder-brand"
                className={`${selectClass} mt-2`}
                value={brand}
                onFocus={() => setFocusedField('brand')}
                onBlur={() => setFocusedField((prev) => prev === 'brand' ? null : prev)}
                onChange={(event) => {
                  setBrand(event.target.value);
                  setModel('');
                  setCategory('');
                }}>
                
                <option value="">Select brand</option>
                {brands.map((item) =>
                <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                )}
              </select>
              </motion.div>

              <motion.div
                animate={{ y: focusedField === 'model' ? -1 : 0 }}
                transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}>
              <label className={labelClass} htmlFor="finder-model">
                Vehicle Model
              </label>
              <select
                id="finder-model"
                className={`${selectClass} mt-2`}
                value={model}
                disabled={!brand}
                onFocus={() => setFocusedField('model')}
                onBlur={() => setFocusedField((prev) => prev === 'model' ? null : prev)}
                onChange={(event) => {
                  setModel(event.target.value);
                  setCategory('');
                }}>
                
                <option value="">{brand ? 'Select model' : 'Select brand first'}</option>
                {models.map((item) =>
                <option key={item.modelSlug} value={item.modelSlug}>
                    {item.model}
                  </option>
                )}
              </select>
              </motion.div>

              <motion.div
                animate={{ y: focusedField === 'category' ? -1 : 0 }}
                transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}>
              <label className={labelClass} htmlFor="finder-category">
                Product Category
              </label>
              <select
                id="finder-category"
                className={`${selectClass} mt-2`}
                value={category}
                disabled={!brand || !model}
                onFocus={() => setFocusedField('category')}
                onBlur={() => setFocusedField((prev) => prev === 'category' ? null : prev)}
                onChange={(event) => setCategory(event.target.value)}>
                
                <option value="">{brand && model ? 'Select category' : 'Select model first'}</option>
                {availableCategories.map((item) =>
                <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                )}
              </select>
              </motion.div>

              <div className="flex items-end sm:col-span-2 lg:col-span-1">
              <motion.button
                type="submit"
                disabled={!canSubmit}
                whileHover={canSubmit ? { y: -1, scale: 1.01 } : undefined}
                whileTap={canSubmit ? { scale: 0.99 } : undefined}
                transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-ink-900 px-6 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-200 ease-industrial hover:bg-accent hover:shadow-[0_10px_26px_rgba(0,88,176,0.3)] disabled:cursor-not-allowed disabled:bg-steel-400 disabled:text-steel-200 lg:min-w-[170px]">
                
                <SearchIcon className="h-4 w-4" />
                Find Parts
              </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>);

}