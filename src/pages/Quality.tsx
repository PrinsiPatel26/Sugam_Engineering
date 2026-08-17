import React from 'react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { CTASection } from '../components/CTASection';
import { images } from '../data/images';
import { qualityChecks } from '../data/content';
import { useSeo } from '../hooks/useSeo';

export function Quality() {
  useSeo({
    title: 'Quality Process | R.M. Engineering Brake Components',
    description:
    'Dimensional inspection, surface finish checks, material quality and final inspection of automotive brake discs, brake drums and wheel hubs at R.M. Engineering.'
  });

  return (
    <>
      <PageHero
        eyebrow="Quality"
        title="Quality that drives performance"
        description="Braking components leave no room for approximation. Our checks are built into the line, not bolted on at the end."
        crumbs={[{ label: 'Quality' }]}
        image={images.quality} />
      

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Inspection"
          title="Checks at every stage"
          description="From the incoming casting to the packed carton, each stage has a defined check before the batch moves forward." />
        

        <div className="mt-12 grid gap-px border border-steel-200 bg-steel-200 sm:grid-cols-2 lg:grid-cols-3">
          {qualityChecks.map((check, index) =>
          <article key={check.title} className="bg-white p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel-400">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 font-display text-xl uppercase tracking-wide text-ink-900">
                {check.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-600">{check.description}</p>
            </article>
          )}
        </div>
      </section>

      <section className="border-y border-steel-200 bg-steel-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <div className="border border-steel-200">
                <img
                  src={images.quality}
                  alt="Dimensional inspection of a machined brake disc"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover" />
                
              </div>
            </div>
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="What we measure"
                title="Dimensions that decide the fit"
                as="h2" />
              
              <ul className="mt-8 space-y-4">
                {[
                'Outer diameter, thickness and bore against the application drawing',
                'Stud pitch circle and mounting hole positions',
                'Braking surface finish, flatness and machining consistency',
                'Run-out and balance of machined components',
                'Visual inspection for casting and handling defects',
                'Identification, protective treatment and packing before dispatch'].
                map((item) =>
                <li key={item} className="flex gap-3 border-b border-steel-200 pb-4 text-sm text-ink-800">
                    <span className="mt-2 h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                )}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-steel-500">
                Inspection reports and specific dimensional data for an application can be shared
                against a formal enquiry.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ask for the specifications you need"
        description="Send the vehicle application and we will share the technical details our team can confirm for that component." />
      
    </>);

}