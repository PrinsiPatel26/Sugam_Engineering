import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { images } from '../../data/images';
import { manufacturingStrengths } from '../../data/content';

export function ManufacturingStrength() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <div className="sticky top-28">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
              Manufacturing Strength
            </p>
            <h2 className="mt-3 font-display text-3xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
              Built on process control, not guesswork
            </h2>
            <p className="mt-4 text-base leading-relaxed text-steel-600">
              From raw casting to final packing, every stage is set up to hold the dimensions the
              application demands — and to repeat them batch after batch.
            </p>
            <div className="mt-8 overflow-hidden border border-steel-200">
              <img
                src={images.factory}
                alt="Manufacturing floor with CNC machines and machined brake components"
                loading="lazy"
                className="aspect-[16/10] w-full object-cover" />
              
            </div>
            <Link
              to="/manufacturing"
              className="mt-6 inline-flex h-11 items-center gap-2 border border-steel-300 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-900 transition-colors duration-150 ease-industrial hover:border-ink-900 hover:bg-steel-50">
              
              Inside Our Manufacturing
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7">
          <dl className="grid gap-x-10 sm:grid-cols-2">
            {manufacturingStrengths.map((item, index) =>
            <div key={item.title} className="border-t border-steel-200 py-5">
                <dt className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] text-steel-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-lg uppercase tracking-wide text-ink-900">
                    {item.title}
                  </span>
                </dt>
                <dd className="mt-1.5 pl-7 text-sm leading-relaxed text-steel-600">
                  {item.description}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </section>);

}