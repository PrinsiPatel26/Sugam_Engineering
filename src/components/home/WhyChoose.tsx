import React from 'react';
import { SectionHeading } from '../SectionHeading';
import { whyChooseUs } from '../../data/content';

export function WhyChoose() {
  const [lead, ...rest] = whyChooseUs;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionHeading
        eyebrow="Why SUGAM ENGINEERING"
        title="A supply partner built for the trade"
        description="Dealers, distributors, wholesalers and export buyers work with us because the source, the range and the response are all in one place." />
      

      <div className="mt-12 grid gap-px border border-steel-200 bg-steel-200 md:grid-cols-3">
        <div className="bg-ink-900 p-8 md:row-span-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-light">01</p>
          <h3 className="mt-4 font-display text-3xl uppercase leading-tight tracking-wide text-white">
            {lead.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-steel-300">{lead.description}</p>
          <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-steel-400">
            Enquiries are handled directly by the manufacturing team — availability, MOQ and packing
            confirmed without a chain of intermediaries.
          </p>
        </div>
        {rest.map((item, index) =>
        <div key={item.title} className="bg-white p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel-400">
              {String(index + 2).padStart(2, '0')}
            </p>
            <h3 className="mt-3 font-display text-xl uppercase tracking-wide text-ink-900">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-steel-600">{item.description}</p>
          </div>
        )}
      </div>
    </section>);

}