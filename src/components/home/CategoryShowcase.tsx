import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';
import { categories } from '../../data/categories';
import { countByCategory } from '../../data/products';

export function CategoryShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionHeading
        eyebrow="Product Range"
        title="Brake components engineered for replacement fitment"
        description="Three core product lines, catalogued application by application so buyers can match the exact vehicle they are supplying."
        action={
        <Link
          to="/products"
          className="inline-flex h-11 items-center gap-2 border border-steel-300 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-900 transition-colors duration-150 ease-industrial hover:border-ink-900 hover:bg-steel-50">
          
            View Full Catalogue
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        } />
      

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {categories.map((category, index) =>
        <motion.article
          key={category.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: index * 0.06 }}
          className="group flex h-full flex-col border border-steel-200 bg-white transition-colors duration-200 ease-industrial hover:border-ink-900">
          
            <div className="overflow-hidden bg-steel-100">
              <img
              src={category.image}
              alt={category.name}
              loading="lazy"
              className="aspect-[16/11] w-full object-cover transition-transform duration-300 ease-industrial group-hover:scale-[1.04]" />
            
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl uppercase tracking-wide text-ink-900">
                  {category.name}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel-500">
                  {countByCategory(category.id)} apps
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-steel-600">{category.description}</p>
              <ul className="mt-5 space-y-1.5">
                {category.bullets.slice(0, 3).map((bullet) =>
              <li key={bullet} className="flex gap-2 text-xs text-steel-600">
                    <span className="mt-1.5 h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                    {bullet}
                  </li>
              )}
              </ul>
              <div className="mt-auto pt-6">
                <Link
                to={`/products/${category.id}`}
                className="inline-flex h-11 w-full items-center justify-center gap-2 bg-ink-900 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-150 ease-industrial hover:bg-accent">
                
                  Explore Products
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.article>
        )}
      </div>
    </section>);

}