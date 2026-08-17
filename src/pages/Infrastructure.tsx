import React from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { CTASection } from '../components/CTASection';
import { images } from '../data/images';
import { useSeo } from '../hooks/useSeo';

const facilityBlocks = [
{
  title: 'Manufacturing Facility',
  description:
  'A single-site facility in Bhunava, Rajkot, laid out so material moves in one direction — from receiving through machining to dispatch.',
  image: images.facility,
  span: 'lg:col-span-7'
},
{
  title: 'Production Area',
  description: 'Dedicated production bays for brake discs, brake drums and wheel hubs.',
  image: images.factory,
  span: 'lg:col-span-5'
},
{
  title: 'Machinery',
  description:
  'CNC turning machines and support equipment set up for repeat batch production of brake components.',
  image: images.machining,
  span: 'lg:col-span-5'
},
{
  title: 'Quality Inspection',
  description:
  'A dedicated inspection area with measuring instruments used at every stage of the process.',
  image: images.quality,
  span: 'lg:col-span-7'
},
{
  title: 'Packaging, Warehouse & Dispatch',
  description:
  'Protective packing, batch identification and staged dispatch for domestic and export consignments.',
  image: images.packaging,
  span: 'lg:col-span-12'
}];


export function Infrastructure() {
  useSeo({
    title: 'Infrastructure | R.M. Engineering Manufacturing Facility, Rajkot',
    description:
    'Manufacturing facility, production area, machinery, quality inspection, packaging, warehouse and dispatch infrastructure at R.M. Engineering, Rajkot.'
  });

  return (
    <>
      <PageHero
        eyebrow="Infrastructure"
        title="The plant behind the catalogue"
        description="Production, inspection and dispatch under one roof — organised for consistent batch output and clean handover to transport."
        crumbs={[{ label: 'Infrastructure' }]}
        image={images.factory} />
      

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Facility"
          title="Inside the works"
          description="A look at where components are machined, inspected, packed and dispatched." />
        

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {facilityBlocks.map((block, index) =>
          <motion.figure
            key={block.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: index % 3 * 0.05 }}
            className={`group border border-steel-200 ${block.span}`}>
            
              <div className="overflow-hidden bg-steel-100">
                <img
                src={block.image}
                alt={block.title}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover transition-transform duration-300 ease-industrial group-hover:scale-[1.03]" />
              
              </div>
              <figcaption className="p-6">
                <h3 className="font-display text-2xl uppercase tracking-wide text-ink-900">
                  {block.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-steel-600">
                  {block.description}
                </p>
              </figcaption>
            </motion.figure>
          )}
        </div>
      </section>

      <CTASection
        title="Planning a plant visit?"
        description="Trade and export buyers are welcome to visit the facility. Send an enquiry and our team will arrange a time." />
      
    </>);

}