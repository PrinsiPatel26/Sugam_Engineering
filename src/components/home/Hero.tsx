import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { WhatsAppButton, InquiryButton } from '../ActionButtons';
import { images } from '../../data/images';
import { catalogueStats } from '../../data/products';

const stats = [
{ value: `${catalogueStats.products}+`, label: 'Catalogued applications' },
{ value: `${catalogueStats.brands}`, label: 'Vehicle brands covered' },
{ value: 'Disc · Drum · Hub', label: 'Core product lines' },
{ value: 'Rajkot, India', label: 'Manufacturing base' }];


export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <img
        src={images.hero}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-right opacity-70" />
      
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-transparent"
        aria-hidden="true" />
      

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 lg:px-8 lg:pb-20 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-3xl">
          
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-light">
            Manufacturer · Supplier · Exporter
          </p>
          <h1 className="mt-5 font-display text-[2.75rem] uppercase leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Precision Automotive Brake Components, Built for Performance.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-steel-300 sm:text-lg">
            Manufacturer &amp; exporter of brake disc, brake drum, wheel hub and automotive spare
            components for passenger, utility, commercial and three-wheeler applications.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/products"
              className="inline-flex h-12 items-center justify-center gap-2 bg-accent px-7 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-150 ease-industrial hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              
              Explore Products
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <InquiryButton variant="outlineLight" size="lg" />
            <WhatsAppButton variant="outlineLight" size="lg" label="WhatsApp Us" />
          </div>
        </motion.div>
      </div>

      <div className="relative border-t border-white/10 bg-ink-950/80">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) =>
          <div key={stat.label} className="px-4 py-5 first:pl-0 lg:px-6">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel-500">
                {stat.label}
              </dt>
              <dd className="mt-1.5 font-display text-xl uppercase tracking-wide text-white sm:text-2xl">
                {stat.value}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>);

}