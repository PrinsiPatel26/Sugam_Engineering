import React from 'react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { CTASection } from '../components/CTASection';
import { images } from '../data/images';
import { manufacturingStrengths, processSteps } from '../data/content';
import { useSeo } from '../hooks/useSeo';

export function Manufacturing() {
  useSeo({
    title: 'Manufacturing Process | R.M. Engineering Brake Components',
    description:
    'Inside R.M. Engineering manufacturing — raw material, CNC machining, finishing, inspection, packing and dispatch of automotive brake discs, brake drums and wheel hubs.'
  });

  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title="Precision manufacturing, stage by stage"
        description="Every component follows the same controlled route from raw casting to packed part — so what leaves the plant matches what the application drawing demands."
        crumbs={[{ label: 'Manufacturing' }]}
        image={images.machining} />
      

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Process"
          title="From raw casting to dispatch"
          description="Six controlled stages, each with its own checks, keep output consistent across production batches." />
        

        <ol className="mt-12 grid gap-px border border-steel-200 bg-steel-200 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) =>
          <li key={step.step} className="bg-white p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                {step.step}
              </p>
              <h3 className="mt-3 font-display text-2xl uppercase tracking-wide text-ink-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-600">{step.description}</p>
            </li>
          )}
        </ol>
      </section>

      <section className="border-y border-steel-200 bg-steel-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="border border-steel-200">
                <img
                  src={images.machining}
                  alt="CNC machining of a cast iron brake disc"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover" />
                
              </div>
              <div className="mt-4 border border-steel-200">
                <img
                  src={images.packaging}
                  alt="Packed brake components staged for dispatch"
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover" />
                
              </div>
            </div>
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Capability"
                title="What our manufacturing focuses on"
                as="h2" />
              
              <dl className="mt-8 grid gap-x-10 sm:grid-cols-2">
                {manufacturingStrengths.map((item) =>
                <div key={item.title} className="border-t border-steel-200 py-4">
                    <dt className="font-display text-base uppercase tracking-wide text-ink-900">
                      {item.title}
                    </dt>
                    <dd className="mt-1 text-xs leading-relaxed text-steel-600">
                      {item.description}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Discuss your requirement with the production team"
        description="Share the application, quantity and packing you need. We confirm what we can supply and in what timeframe." />
      
    </>);

}