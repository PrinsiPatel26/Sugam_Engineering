import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import { images } from '../../data/images';
import { qualityChecks } from '../../data/content';

export function QualityHighlights() {
  return (
    <section className="border-y border-steel-200 bg-steel-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-6">
            <div className="overflow-hidden border border-steel-200">
              <img
                src={images.quality}
                alt="Inspector measuring a machined brake disc with a digital micrometer"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover" />
              
            </div>
          </div>
          <div className="lg:col-span-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">Quality</p>
            <h2 className="mt-3 font-display text-3xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-4xl">
              Quality you can trust
            </h2>
            <p className="mt-4 text-base leading-relaxed text-steel-600">
              Components are checked at every stage — dimension, finish, material and final packing —
              so what reaches your counter is what the application drawing calls for.
            </p>
            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {qualityChecks.map((check) =>
              <li key={check.title} className="border-t border-steel-200 py-4">
                  <p className="flex items-center gap-2 font-display text-base uppercase tracking-wide text-ink-900">
                    <CheckIcon className="h-4 w-4 text-accent" aria-hidden="true" />
                    {check.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-steel-600">{check.description}</p>
                </li>
              )}
            </ul>
            <Link
              to="/quality"
              className="mt-8 inline-flex h-11 items-center gap-2 border border-steel-300 bg-white px-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-900 transition-colors duration-150 ease-industrial hover:border-ink-900">
              
              Our Quality Process
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>);

}