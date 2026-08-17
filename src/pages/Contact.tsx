import React from 'react';
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { InquiryForm } from '../components/InquiryForm';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { companyConfig } from '../config/company';
import { generalInquiryMessage, telHref, whatsappUrl } from '../utils/inquiry';
import { useSeo } from '../hooks/useSeo';

const enquiryTypes = [
{ title: 'Bulk Enquiry', description: 'Volume requirements for repeat monthly supply.' },
{ title: 'Dealer Enquiry', description: 'Counter sales and retail network requirements.' },
{ title: 'Distributor Enquiry', description: 'Territory-wise distribution and stocking.' },
{ title: 'Export Enquiry', description: 'International buyers, packing and documentation.' }];


export function Contact() {
  useSeo({
    title: 'Contact R.M. Engineering | Brake Component Manufacturer, Rajkot',
    description:
    'Contact R.M. Engineering for bulk orders, dealership enquiries, distribution enquiries and export requirements for automotive brake discs, brake drums and wheel hubs.'
  });

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to our team"
        description="For bulk orders, dealership enquiries, distribution enquiries and export requirements, contact our sales team directly."
        crumbs={[{ label: 'Contact' }]} />
      

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={telHref}
            className="group border border-steel-200 p-6 transition-colors duration-200 ease-industrial hover:border-ink-900">
            
            <PhoneIcon className="h-5 w-5 text-accent" aria-hidden="true" />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-steel-500">
              Call
            </p>
            <p className="mt-1 font-display text-xl uppercase tracking-wide text-ink-900">
              {companyConfig.phoneDisplay}
            </p>
            <p className="mt-1 text-xs text-steel-600">{companyConfig.altPhoneDisplay}</p>
          </a>

          <a
            href={whatsappUrl(generalInquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-steel-200 p-6 transition-colors duration-200 ease-industrial hover:border-ink-900">
            
            <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-steel-500">
              WhatsApp
            </p>
            <p className="mt-1 font-display text-xl uppercase tracking-wide text-ink-900">
              {companyConfig.whatsappDisplay}
            </p>
            <p className="mt-1 text-xs text-steel-600">Fastest response for product enquiries</p>
          </a>

          <a
            href={`mailto:${companyConfig.email}`}
            className="group border border-steel-200 p-6 transition-colors duration-200 ease-industrial hover:border-ink-900">
            
            <MailIcon className="h-5 w-5 text-accent" aria-hidden="true" />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-steel-500">
              Email
            </p>
            <p className="mt-1 break-all font-display text-lg uppercase tracking-wide text-ink-900">
              {companyConfig.email}
            </p>
            <p className="mt-1 text-xs text-steel-600">Send drawings and requirement lists</p>
          </a>

          <div className="border border-steel-200 p-6">
            <MapPinIcon className="h-5 w-5 text-accent" aria-hidden="true" />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-steel-500">
              Address
            </p>
            <p className="mt-1 text-sm font-medium leading-relaxed text-ink-900">
              {companyConfig.address.line1}
              <br />
              {companyConfig.address.line2}
              <br />
              {companyConfig.address.state}, {companyConfig.address.country}
            </p>
          </div>
        </div>

        <p className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-steel-500">
          <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {companyConfig.businessHours}
        </p>
      </section>

      <section className="border-y border-steel-200 bg-steel-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Enquiry Form"
                title="Send your requirement"
                description="Share the vehicle brand, model, component and quantity. Our team responds with availability, MOQ, specifications and quotation."
                as="h2" />
              
              <div className="mt-8 border border-steel-200 bg-white p-6 lg:p-8">
                <InquiryForm />
              </div>
            </div>

            <div className="lg:col-span-5">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel-500">
                Enquiry Types
              </h2>
              <div className="mt-5 grid gap-px border border-steel-200 bg-steel-200">
                {enquiryTypes.map((type) =>
                <div key={type.title} className="bg-white p-5">
                    <p className="font-display text-lg uppercase tracking-wide text-ink-900">
                      {type.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-steel-600">{type.description}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 border border-steel-200 bg-white">
                <iframe
                  title="R.M. Engineering location on Google Maps"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    companyConfig.mapsEmbedQuery
                  )}&output=embed`}
                  className="h-72 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" />
                
                <div className="flex items-center justify-between gap-4 border-t border-steel-200 p-4">
                  <p className="text-xs text-steel-600">{companyConfig.addressFull}</p>
                  <a
                    href={companyConfig.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-accent hover:text-accent-dark">
                    
                    Open Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>);

}