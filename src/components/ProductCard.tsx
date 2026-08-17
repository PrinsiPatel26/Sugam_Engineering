import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { productWhatsAppUrl } from '../utils/inquiry';
import { useInquiry } from '../contexts/InquiryContext';
import type { Product } from '../types/catalogue';

export function ProductCard({ product }: {product: Product;}) {
  const { openInquiry } = useInquiry();

  return (
    <article className="group flex h-full flex-col border border-steel-200 bg-white transition-colors duration-200 ease-industrial hover:border-ink-900">
      <Link
        to={`/product/${product.id}`}
        className="relative block overflow-hidden bg-steel-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent">
        
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 ease-industrial group-hover:scale-[1.04]" />
        
        <span className="absolute left-0 top-0 bg-ink-900/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white">
          {product.categoryName}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          {product.brand}
        </p>
        <h3 className="mt-2 font-display text-xl uppercase leading-tight tracking-wide text-ink-900">
          <Link
            to={`/product/${product.id}`}
            className="transition-colors duration-150 ease-industrial hover:text-accent">
            
            {product.name}
          </Link>
        </h3>

        <dl className="mt-4 space-y-1.5 border-t border-steel-100 pt-4 text-xs">
          <div className="flex justify-between gap-3">
            <dt className="text-steel-500">Application</dt>
            <dd className="text-right font-medium text-ink-800">{product.application}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-steel-500">Material</dt>
            <dd className="text-right font-medium text-ink-800">{product.material}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-steel-500">Segment</dt>
            <dd className="text-right font-medium text-ink-800">{product.segment}</dd>
          </div>
        </dl>

        <div className="mt-auto pt-5">
          <Link
            to={`/product/${product.id}`}
            className="inline-flex h-10 w-full items-center justify-center gap-2 bg-ink-900 px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-150 ease-industrial hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            
            View Details
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <a
              href={productWhatsAppUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center gap-1.5 border border-steel-300 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-900 transition-colors duration-150 ease-industrial hover:border-ink-900 hover:bg-steel-50"
              aria-label={`WhatsApp inquiry for ${product.name}`}>
              
              <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => openInquiry({ product })}
              className="inline-flex h-9 items-center justify-center border border-steel-300 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-900 transition-colors duration-150 ease-industrial hover:border-ink-900 hover:bg-steel-50">
              
              Inquiry
            </button>
          </div>
        </div>
      </div>
    </article>);

}