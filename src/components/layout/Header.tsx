import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, MailIcon, MapPinIcon, MenuIcon, PhoneIcon, SearchIcon, XIcon } from 'lucide-react';
import { Logo } from './Logo';
import { SearchBar } from '../SearchBar';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { categories } from '../../data/categories';
import { brands, countByCategory, productsByBrand } from '../../data/products';
import { companyConfig } from '../../config/company';
import { generalInquiryMessage, telHref, whatsappUrl } from '../../utils/inquiry';
import { useInquiry } from '../../contexts/InquiryContext';

const companyLinks = [
{ label: 'Manufacturing', to: '/manufacturing', description: 'Process, machining and finishing' },
{ label: 'Infrastructure', to: '/infrastructure', description: 'Plant, machinery and dispatch' },
{ label: 'Quality', to: '/quality', description: 'Inspection and dimensional control' }];


type MenuKey = 'products' | 'vehicles' | 'company' | null;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { openInquiry } = useInquiry();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinkClass = ({ isActive }: {isActive: boolean;}) =>
  `relative py-2 font-medium uppercase tracking-[0.1em] transition-colors duration-150 ease-industrial ${
  isActive ? 'text-white' : 'text-steel-300 hover:text-white'}`;


  return (
    <header className="sticky top-0 z-[80] w-full">
      {/* Utility bar */}
      <div
        className={`hidden overflow-hidden border-b border-white/10 bg-ink-950 transition-all duration-200 ease-industrial lg:block ${
        scrolled ? 'h-0 opacity-0' : 'h-9 opacity-100'}`
        }>
        
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 font-mono text-[10px] uppercase tracking-[0.16em] text-steel-400 sm:px-6 lg:px-8">
          <span className="flex items-center gap-2">
            <MapPinIcon className="h-3 w-3" aria-hidden="true" />
            {companyConfig.addressFull}
          </span>
          <span className="flex items-center gap-6">
            <a href={`mailto:${companyConfig.email}`} className="flex items-center gap-2 hover:text-white">
              <MailIcon className="h-3 w-3" aria-hidden="true" />
              {companyConfig.email}
            </a>
            <span className="text-steel-600">|</span>
            <span>{companyConfig.businessType}</span>
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div
        className="border-b border-white/10 bg-ink-900/95 backdrop-blur"
        onMouseLeave={() => setMenu(null)}>
        
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 transition-all duration-200 ease-industrial sm:px-6 lg:px-8 ${
          scrolled ? 'h-16' : 'h-20'}`
          }>
          
          <Logo compact={scrolled} />

          <nav className="hidden items-center gap-7 text-xs lg:flex" aria-label="Primary">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>

            <MegaTrigger
              label="Products"
              active={menu === 'products'}
              onOpen={() => setMenu('products')} />
            
            <MegaTrigger
              label="Vehicle Applications"
              active={menu === 'vehicles'}
              onOpen={() => setMenu('vehicles')} />
            
            <MegaTrigger label="Company" active={menu === 'company'} onOpen={() => setMenu('company')} />

            <NavLink to="/quality" className={navLinkClass}>
              Quality
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen((prev) => !prev)}
              aria-label="Search products"
              aria-expanded={searchOpen}
              className="grid h-10 w-10 place-items-center border border-white/15 text-steel-300 transition-colors duration-150 ease-industrial hover:border-white/40 hover:text-white">
              
              {searchOpen ? <XIcon className="h-4 w-4" /> : <SearchIcon className="h-4 w-4" />}
            </button>

            <a
              href={whatsappUrl(generalInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center gap-2 border border-white/15 px-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-150 ease-industrial hover:border-white/40 hover:bg-white/5 sm:inline-flex">
              
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center border border-white/15 text-white lg:hidden">
              
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mega menus */}
        <AnimatePresence>
          {menu &&
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="absolute left-0 right-0 top-full hidden border-b border-steel-200 bg-white shadow-2xl lg:block"
            onMouseEnter={() => setMenu(menu)}>
            
              <div className="mx-auto max-w-7xl px-8 py-8">
                {menu === 'products' && <ProductsMenu />}
                {menu === 'vehicles' && <VehiclesMenu />}
                {menu === 'company' && <CompanyMenu onInquiry={() => openInquiry()} />}
              </div>
            </motion.div>
          }
        </AnimatePresence>

        {/* Search drawer */}
        <AnimatePresence>
          {searchOpen &&
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-visible border-t border-white/10 bg-ink-800">
            
              <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
                <SearchBar tone="dark" autoFocus onNavigate={() => setSearchOpen(false)} />
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>);

}

function MegaTrigger({
  label,
  active,
  onOpen




}: {label: string;active: boolean;onOpen: () => void;}) {
  return (
    <button
      type="button"
      onMouseEnter={onOpen}
      onFocus={onOpen}
      onClick={onOpen}
      aria-expanded={active}
      className={`flex items-center gap-1.5 py-2 text-xs font-medium uppercase tracking-[0.1em] transition-colors duration-150 ease-industrial ${
      active ? 'text-white' : 'text-steel-300 hover:text-white'}`
      }>
      
      {label}
      <ChevronDownIcon
        className={`h-3.5 w-3.5 transition-transform duration-150 ease-industrial ${
        active ? 'rotate-180' : ''}`
        }
        aria-hidden="true" />
      
    </button>);

}

function MenuColumnTitle({ children }: {children: React.ReactNode;}) {
  return (
    <p className="mb-4 border-b border-steel-200 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-steel-500">
      {children}
    </p>);

}

function ProductsMenu() {
  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-8 grid grid-cols-3 gap-6">
        {categories.map((category) =>
        <Link
          key={category.id}
          to={`/products/${category.id}`}
          className="group border border-steel-200 transition-colors duration-200 ease-industrial hover:border-ink-900">
          
            <div className="overflow-hidden bg-steel-100">
              <img
              src={category.image}
              alt=""
              className="aspect-[16/10] w-full object-cover transition-transform duration-300 ease-industrial group-hover:scale-[1.04]" />
            
            </div>
            <div className="p-4">
              <p className="font-display text-lg uppercase tracking-wide text-ink-900">
                {category.name}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-steel-600">{category.tagline}</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                {countByCategory(category.id)} applications
              </p>
            </div>
          </Link>
        )}
      </div>
      <div className="col-span-4">
        <MenuColumnTitle>Browse Catalogue</MenuColumnTitle>
        <ul className="space-y-2.5 text-sm text-ink-800">
          <li>
            <Link to="/products" className="hover:text-accent">
              All Products
            </Link>
          </li>
          <li>
            <Link to="/products/brake-disc" className="hover:text-accent">
              Vented &amp; Plain Brake Discs
            </Link>
          </li>
          <li>
            <Link to="/products/brake-disc" className="hover:text-accent">
              Disc Brake Rotors
            </Link>
          </li>
          <li>
            <Link to="/products/brake-drum" className="hover:text-accent">
              Brake Drums
            </Link>
          </li>
          <li>
            <Link to="/products/wheel-hub" className="hover:text-accent">
              Wheel Hubs &amp; Axle Carriers
            </Link>
          </li>
          <li>
            <Link to="/vehicles" className="hover:text-accent">
              Browse by Vehicle Brand
            </Link>
          </li>
        </ul>
      </div>
    </div>);

}

function VehiclesMenu() {
  return (
    <div>
      <div className="flex items-end justify-between">
        <MenuColumnTitle>Browse Products by Vehicle Brand</MenuColumnTitle>
      </div>
      <div className="grid grid-cols-5 gap-x-8 gap-y-2.5">
        {brands.map((brand) =>
        <Link
          key={brand.slug}
          to={`/vehicles/${brand.slug}`}
          className="flex items-center justify-between border-b border-steel-100 py-2 text-sm text-ink-800 transition-colors duration-150 ease-industrial hover:text-accent">
          
            {brand.name}
            <span className="font-mono text-[10px] text-steel-400">
              {productsByBrand(brand.slug).length}
            </span>
          </Link>
        )}
        <Link
          to="/contact"
          className="flex items-center justify-between border-b border-steel-100 py-2 text-sm text-accent">
          
          Other Brands — Ask Us
        </Link>
      </div>
    </div>);

}

function CompanyMenu({ onInquiry }: {onInquiry: () => void;}) {
  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-7">
        <MenuColumnTitle>Company</MenuColumnTitle>
        <div className="grid grid-cols-2 gap-4">
          {companyLinks.map((link) =>
          <Link
            key={link.to}
            to={link.to}
            className="border border-steel-200 p-4 transition-colors duration-200 ease-industrial hover:border-ink-900">
            
              <p className="font-display text-lg uppercase tracking-wide text-ink-900">{link.label}</p>
              <p className="mt-1 text-xs text-steel-600">{link.description}</p>
            </Link>
          )}
        </div>
      </div>
      <div className="col-span-5">
        <MenuColumnTitle>Contact</MenuColumnTitle>
        <ul className="space-y-3 text-sm text-ink-800">
          <li className="flex items-center gap-3">
            <PhoneIcon className="h-4 w-4 text-accent" aria-hidden="true" />
            <a href={telHref} className="hover:text-accent">
              {companyConfig.phoneDisplay}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
            <a
              href={whatsappUrl(generalInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent">
              
              WhatsApp Enquiry
            </a>
          </li>
          <li className="flex items-center gap-3">
            <MailIcon className="h-4 w-4 text-accent" aria-hidden="true" />
            <a href={`mailto:${companyConfig.email}`} className="hover:text-accent">
              {companyConfig.email}
            </a>
          </li>
          <li className="flex items-start gap-3">
            <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <span className="text-steel-600">{companyConfig.addressFull}</span>
          </li>
        </ul>
        <button
          type="button"
          onClick={onInquiry}
          className="mt-5 h-11 w-full bg-accent text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-150 ease-industrial hover:bg-accent-dark">
          
          Send Inquiry
        </button>
      </div>
    </div>);

}

function MobileMenu({ open, onClose }: {open: boolean;onClose: () => void;}) {
  const [section, setSection] = useState<'products' | 'brands' | null>('products');

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-[95] lg:hidden">
          <motion.div
          className="absolute inset-0 bg-ink-950/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose} />
        
          <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="absolute right-0 top-0 flex h-full w-[92%] max-w-md flex-col bg-ink-900">
          
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <Logo compact />
              <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center border border-white/15 text-white">
              
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="border-b border-white/10 p-4">
              <SearchBar tone="dark" onNavigate={onClose} />
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
              <ul className="space-y-1 text-sm">
                <li>
                  <Link to="/" onClick={onClose} className="block py-3 uppercase tracking-[0.1em] text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <button
                  type="button"
                  onClick={() => setSection(section === 'products' ? null : 'products')}
                  className="flex w-full items-center justify-between py-3 uppercase tracking-[0.1em] text-white"
                  aria-expanded={section === 'products'}>
                  
                    Products
                    <ChevronDownIcon
                    className={`h-4 w-4 transition-transform duration-150 ease-industrial ${
                    section === 'products' ? 'rotate-180' : ''}`
                    } />
                  
                  </button>
                  {section === 'products' &&
                <ul className="mb-2 space-y-1 border-l border-white/10 pl-4">
                      <li>
                        <Link to="/products" onClick={onClose} className="block py-2 text-steel-300">
                          All Products
                        </Link>
                      </li>
                      {categories.map((category) =>
                  <li key={category.id}>
                          <Link
                      to={`/products/${category.id}`}
                      onClick={onClose}
                      className="block py-2 text-steel-300">
                      
                            {category.name}
                          </Link>
                        </li>
                  )}
                    </ul>
                }
                </li>
                <li>
                  <button
                  type="button"
                  onClick={() => setSection(section === 'brands' ? null : 'brands')}
                  className="flex w-full items-center justify-between py-3 uppercase tracking-[0.1em] text-white"
                  aria-expanded={section === 'brands'}>
                  
                    Vehicle Applications
                    <ChevronDownIcon
                    className={`h-4 w-4 transition-transform duration-150 ease-industrial ${
                    section === 'brands' ? 'rotate-180' : ''}`
                    } />
                  
                  </button>
                  {section === 'brands' &&
                <ul className="mb-2 grid grid-cols-2 gap-x-4 border-l border-white/10 pl-4">
                      {brands.map((brand) =>
                  <li key={brand.slug}>
                          <Link
                      to={`/vehicles/${brand.slug}`}
                      onClick={onClose}
                      className="block py-2 text-steel-300">
                      
                            {brand.name}
                          </Link>
                        </li>
                  )}
                    </ul>
                }
                </li>
                {companyLinks.map((link) =>
              <li key={link.to}>
                    <Link
                  to={link.to}
                  onClick={onClose}
                  className="block py-3 uppercase tracking-[0.1em] text-white">
                  
                      {link.label}
                    </Link>
                  </li>
              )}
                <li>
                  <Link to="/contact" onClick={onClose} className="block py-3 uppercase tracking-[0.1em] text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="grid grid-cols-2 gap-3 border-t border-white/10 p-4">
              <a
              href={whatsappUrl(generalInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 border border-white/20 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
              
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                WhatsApp
              </a>
              <a
              href={telHref}
              className="inline-flex h-11 items-center justify-center gap-2 bg-accent text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
              
                <PhoneIcon className="h-4 w-4" />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}