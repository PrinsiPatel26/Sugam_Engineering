import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CheckCircle2Icon } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductGallery } from '../components/ProductGallery';
import { ProductGrid } from '../components/ProductGrid';
import { SectionHeading } from '../components/SectionHeading';
import { CTASection } from '../components/CTASection';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { getProduct, relatedProducts } from '../data/products';
import { companyConfig } from '../config/company';
import { productWhatsAppUrl } from '../utils/inquiry';
import { useInquiry } from '../contexts/InquiryContext';
import { useSeo } from '../hooks/useSeo';

export function ProductDetail() {
  const { id } = useParams<{id: string;}>();
  const product = id ? getProduct(id) : undefined;
  const { openInquiry } = useInquiry();

  useSeo({
    title: product ?
    `${product.name} | R.M. Engineering` :
    'Product Not Found | R.M. Engineering',
    description: product ?
    `${product.name} — ${product.categoryName} for ${product.application}. Manufacturer and exporter enquiries for availability, MOQ and specifications.` :
    'The requested product could not be found in the R.M. Engineering catalogue.'
  });

  if (!product) return <Navigate to="/products" replace />;

  const related = relatedProducts(product);

  return (
    <>
      <div className="border-b border-steel-200 bg-steel-50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
            { label: 'Products', to: '/products' },
            { label: product.categoryName, to: `/products/${product.category}` },
            { label: product.brand, to: `/vehicles/${product.brandSlug}` },
            { label: product.name }]
            } />
          
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              {product.categoryName} · {product.brand}
            </p>
            <h1 className="mt-3 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-steel-600">{product.description}</p>

            <dl className="mt-8 grid grid-cols-2 gap-px border border-steel-200 bg-steel-200">
              <Fact label="Vehicle Brand" value={product.brand} />
              <Fact label="Vehicle Model" value={product.model} />
              <Fact label="Application" value={product.application} />
              <Fact label="Category" value={product.categoryName} />
              <Fact label="Product Type" value={product.productType} />
              <Fact label="Material" value={product.material} />
              <Fact label="Part Number" value={product.partNumber ?? 'Shared on inquiry'} />
              <Fact label="Vehicle Segment" value={product.segment} />
            </dl>

            <p className="mt-4 flex items-center gap-2 text-sm font-medium text-ink-800">
              <CheckCircle2Icon className="h-4 w-4 text-accent" aria-hidden="true" />
              Availability: Available on Inquiry
            </p>

            <div className="mt-6 border border-steel-200 bg-steel-50 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel-500">
                Enquire about this product
              </p>
              <div className="mt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={() => openInquiry({ product })}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 bg-accent text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-150 ease-industrial hover:bg-accent-dark">
                  
                  Send Inquiry
                </button>
                <a
                  href={productWhatsAppUrl(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 border border-steel-300 bg-white text-xs font-semibold uppercase tracking-[0.14em] text-ink-900 transition-colors duration-150 ease-industrial hover:border-ink-900">
                  
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                  WhatsApp
                </a>
              </div>
              <p className="mt-4 text-xs text-steel-500">
                {companyConfig.phoneDisplay} · {companyConfig.email} · Bulk, dealer, distributor and
                export enquiries welcome.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <section className="lg:col-span-7">
            <h2 className="font-display text-2xl uppercase tracking-wide text-ink-900">
              Technical Specifications
            </h2>
            <dl className="mt-5 divide-y divide-steel-200 border-y border-steel-200">
              {Object.entries(product.specifications).map(([label, value]) =>
              <div key={label} className="flex justify-between gap-6 py-3">
                  <dt className="text-sm text-steel-500">{label}</dt>
                  <dd className="text-right text-sm font-medium text-ink-900">{value}</dd>
                </div>
              )}
            </dl>
            <p className="mt-4 text-xs text-steel-500">
              Dimensional details for a specific application are shared on enquiry against the vehicle
              model and part reference.
            </p>
          </section>

          <section className="lg:col-span-5">
            <h2 className="font-display text-2xl uppercase tracking-wide text-ink-900">
              Applications
            </h2>
            <ul className="mt-5 space-y-2">
              <li className="border border-steel-200 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel-500">
                  Fitment
                </p>
                <p className="mt-1 text-sm font-medium text-ink-900">{product.application}</p>
              </li>
              <li className="border border-steel-200 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel-500">
                  Segment
                </p>
                <p className="mt-1 text-sm font-medium text-ink-900">{product.segment}</p>
              </li>
              <li className="border border-steel-200 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel-500">
                  Supply
                </p>
                <p className="mt-1 text-sm font-medium text-ink-900">
                  Replacement / aftermarket · domestic and export
                </p>
              </li>
            </ul>
            <Link
              to={`/vehicles/${product.brandSlug}/${product.modelSlug}`}
              className="mt-4 inline-flex h-11 w-full items-center justify-center border border-steel-300 text-xs font-semibold uppercase tracking-[0.14em] text-ink-900 transition-colors duration-150 ease-industrial hover:border-ink-900 hover:bg-steel-50">
              
              All parts for {product.brand} {product.model}
            </Link>
          </section>
        </div>

        {related.length > 0 &&
        <div className="mt-16">
            <SectionHeading
            eyebrow="Related Applications"
            title={`More for ${product.brand}`}
            as="h2" />
          
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </div>
        }
      </div>

      <CTASection context={`${product.name} (${product.application})`} />
    </>);

}

function Fact({ label, value }: {label: string;value: string;}) {
  return (
    <div className="bg-white p-4">
      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel-500">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-ink-900">{value}</dd>
    </div>);

}