import React from 'react';
import { InquiryButton, WhatsAppButton } from './ActionButtons';
import { companyConfig } from '../config/company';

interface CTASectionProps {
  title?: string;
  description?: string;
  context?: string;
}

export function CTASection({
  title = 'Send Your Requirement',
  description = 'Share the vehicle brand, model and component you need. Our team confirms availability, MOQ and specifications for domestic and export enquiries.',
  context
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-ink-900">
      <div className="tech-grid absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-light">
            Enquiry · Bulk · Dealer · Export
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-[1.05] tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-steel-300">{description}</p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-steel-400">
            {companyConfig.phoneDisplay} · {companyConfig.email}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col lg:min-w-[260px]">
          <InquiryButton context={context} variant="primary" size="md" fullWidth />
          <WhatsAppButton context={context} variant="outlineLight" size="md" label="WhatsApp Us" fullWidth />
        </div>
      </div>
    </section>);

}