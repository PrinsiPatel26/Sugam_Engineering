import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, PlayCircleIcon } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { CTASection } from '../components/CTASection';
import { images } from '../data/images';
import { categories } from '../data/categories';
import { whyChooseUs } from '../data/content';
import { brands, catalogueStats, countByCategory } from '../data/products';
import { companyConfig } from '../config/company';
import { useSeo } from '../hooks/useSeo';

export function About() {
  useSeo({
    title: 'About R.M. Engineering | Automotive Brake Component Manufacturer, Rajkot',
    description:
    'R.M. Engineering is a Rajkot-based manufacturer, supplier and exporter of automotive brake discs, brake drums and wheel hubs for passenger, utility, commercial and three-wheeler applications.'
  });

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="An engineering manufacturer of automotive brake components"
        description="Based in Bhunava, Rajkot — Gujarat's engineering belt — R.M. Engineering manufactures, supplies and exports brake discs, brake drums and wheel hubs for a wide span of vehicle applications."
        crumbs={[{ label: 'About Us' }]}
        image={images.facility} />
      

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Company Introduction"
              title="Manufacturing brake components for India and export markets"
              as="h2" />
            
            <div className="mt-6 space-y-4 text-base leading-relaxed text-steel-600">
              <p>
                R.M. Engineering manufactures automotive brake components and spare parts for
                passenger cars, utility vehicles, commercial vehicles, three-wheelers, trucks and
                trailers. Our range covers brake discs, brake drums and wheel hubs catalogued
                application by application across leading vehicle brands.
              </p>
              <p>
                We work as a direct manufacturing source for dealers, distributors, wholesalers,
                workshops and spare parts businesses. Every enquiry is handled by the team that runs
                the production line, so availability, quantity and packing are confirmed without a
                chain of intermediaries.
              </p>
              <p>
                Our focus is straightforward: dimensional accuracy, sturdy construction, corrosion
                resistance and a finish that lets the component go straight onto the vehicle as a
                replacement part.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-px border border-steel-200 bg-steel-200 sm:grid-cols-4">
              {[
              { label: 'Applications catalogued', value: `${catalogueStats.products}+` },
              { label: 'Vehicle brands', value: `${brands.length}` },
              { label: 'Vehicle models', value: `${catalogueStats.models}+` },
              { label: 'Product lines', value: `${categories.length}` }].
              map((stat) =>
              <div key={stat.label} className="bg-white p-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel-500">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 font-display text-2xl uppercase tracking-wide text-ink-900">
                    {stat.value}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-steel-200">
              <img
                src={images.components}
                alt="Range of brake discs, brake drums and wheel hubs"
                loading="lazy"
                className="aspect-[16/10] w-full object-cover" />
              
              <div className="p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel-500">
                  Product Range
                </p>
                <ul className="mt-4 space-y-3">
                  {categories.map((category) =>
                  <li key={category.id} className="flex items-baseline justify-between gap-4">
                      <Link
                      to={`/products/${category.id}`}
                      className="font-display text-lg uppercase tracking-wide text-ink-900 hover:text-accent">
                      
                        {category.name}
                      </Link>
                      <span className="font-mono text-[11px] text-steel-500">
                        {countByCategory(category.id)} apps
                      </span>
                    </li>
                  )}
                </ul>
                <Link
                  to="/products"
                  className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 bg-ink-900 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-150 ease-industrial hover:bg-accent">
                  
                  View Catalogue
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-steel-200 bg-steel-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-3">
            {[
            {
              title: 'Manufacturing Expertise',
              body: 'Machining lines set up for brake components, with process controls that hold critical diameters, thickness and pitch circle dimensions across production batches.',
              link: { to: '/manufacturing', label: 'Manufacturing process' }
            },
            {
              title: 'Infrastructure',
              body: 'Production area, machining, inspection, packing and dispatch organised as a single flow so batches move without handling damage or mix-ups.',
              link: { to: '/infrastructure', label: 'Our infrastructure' }
            },
            {
              title: 'Quality Process',
              body: 'Stage-wise inspection from incoming casting to final packing — dimensional, surface finish, material and visual checks before dispatch.',
              link: { to: '/quality', label: 'Quality process' }
            }].
            map((block) =>
            <article key={block.title} className="flex h-full flex-col border-t-2 border-ink-900 pt-6">
                <h3 className="font-display text-2xl uppercase tracking-wide text-ink-900">
                  {block.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{block.body}</p>
                <Link
                to={block.link.to}
                className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-accent hover:text-accent-dark">
                
                  {block.link.label}
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
              </article>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Supply" title="Domestic supply & export capability" as="h2" />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-steel-600">
              <p>
                We supply the Indian replacement market through dealers, distributors and wholesalers,
                and handle export enquiries with packing and marking prepared to the buyer's
                requirement.
              </p>
              <p>
                Bulk requirements, dealership enquiries and distribution enquiries are welcome. Share
                the applications and quantities you need and our team will respond with availability
                and quotation.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel-500">
              Our Strengths
            </h3>
            <dl className="mt-5 grid gap-x-10 sm:grid-cols-2">
              {whyChooseUs.map((item) =>
              <div key={item.title} className="border-t border-steel-200 py-4">
                  <dt className="font-display text-lg uppercase tracking-wide text-ink-900">
                    {item.title}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-steel-600">{item.description}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-ink-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative overflow-hidden border border-white/10">
              <img
                src={images.factory}
                alt="R.M. Engineering production floor"
                loading="lazy"
                className="aspect-[16/9] w-full object-cover opacity-80" />
              
              <div className="absolute inset-0 grid place-items-center bg-ink-950/40">
                <PlayCircleIcon className="h-14 w-14 text-white/90" aria-hidden="true" />
              </div>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-light">
                Corporate Video
              </p>
              <h2 className="mt-3 font-display text-3xl uppercase leading-tight tracking-tight text-white sm:text-4xl">
                See the plant in motion
              </h2>
              <p className="mt-4 text-base leading-relaxed text-steel-300">
                Our corporate film covering the machining line, inspection area and dispatch is shared
                with serious trade and export buyers on request. Ask for the link along with your
                enquiry.
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-steel-400">
                Request via {companyConfig.email}
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>);

}