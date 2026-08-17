import React from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { companyConfig } from '../../config/company';
import { categories } from '../../data/categories';
import { brands } from '../../data/products';
import { generalInquiryMessage, telHref, whatsappUrl } from '../../utils/inquiry';
import { useInquiry } from '../../contexts/InquiryContext';

const columnTitle = 'font-mono text-[10px] uppercase tracking-[0.2em] text-steel-500';
const linkClass = 'text-sm text-steel-300 transition-colors duration-150 ease-industrial hover:text-white';

export function Footer() {
  const { openInquiry } = useInquiry();

  return (
    <footer className="bg-ink-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center bg-accent font-display text-lg uppercase text-white">
                RM
              </span>
              <span className="font-display text-2xl uppercase tracking-tight">SUGAM ENGINEERING</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-steel-400">
              {companyConfig.tagline}. Supplying brake discs, brake drums and wheel hubs for passenger,
              utility, commercial and three-wheeler applications across India and export markets.
            </p>
            <button
              type="button"
              onClick={() => openInquiry()}
              className="mt-6 inline-flex h-11 items-center justify-center bg-accent px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-150 ease-industrial hover:bg-accent-dark">
              
              Send Your Requirement
            </button>
          </div>

          <div className="lg:col-span-2">
            <p className={columnTitle}>Products</p>
            <ul className="mt-4 space-y-2.5">
              {categories.map((category) =>
              <li key={category.id}>
                  <Link to={`/products/${category.id}`} className={linkClass}>
                    {category.name}
                  </Link>
                </li>
              )}
              <li>
                <Link to="/products" className={linkClass}>
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className={columnTitle}>Vehicle Applications</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 lg:grid-cols-1">
              {brands.slice(0, 8).map((brand) =>
              <li key={brand.slug}>
                  <Link to={`/vehicles/${brand.slug}`} className={linkClass}>
                    {brand.name}
                  </Link>
                </li>
              )}
              <li>
                <Link to="/vehicles" className={linkClass}>
                  All Brands
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className={columnTitle}>Company</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link to="/manufacturing" className={linkClass}>
                  Manufacturing
                </Link>
              </li>
              <li>
                <Link to="/infrastructure" className={linkClass}>
                  Infrastructure
                </Link>
              </li>
              <li>
                <Link to="/quality" className={linkClass}>
                  Quality
                </Link>
              </li>
              <li>
                <Link to="/contact" className={linkClass}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className={columnTitle}>Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-steel-300">
              <li className="flex items-start gap-2.5">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" />
                <a href={telHref} className="hover:text-white">
                  {companyConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#25D366]" />
                <a
                  href={whatsappUrl(generalInquiryMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white">
                  
                  {companyConfig.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" />
                <a href={`mailto:${companyConfig.email}`} className="break-all hover:text-white">
                  {companyConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" />
                <a
                  href={companyConfig.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white">
                  
                  {companyConfig.addressFull}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 font-mono text-[10px] uppercase tracking-[0.16em] text-steel-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} SUGAM ENGINEERING. All rights reserved.</span>
          <span>Manufacturer · Supplier · Exporter · Rajkot, Gujarat, India</span>
        </div>
      </div>
    </footer>);

}