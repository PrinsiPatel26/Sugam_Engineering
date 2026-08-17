import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import type { Brand } from '../types/catalogue';

interface BrandCardProps {
  brand: Brand;
  count: number;
  tone?: 'light' | 'dark';
}

export function BrandCard({ brand, count, tone = 'light' }: BrandCardProps) {
  const dark = tone === 'dark';
  return (
    <Link
      to={`/vehicles/${brand.slug}`}
      className={`group relative flex flex-col justify-between border p-5 transition-colors duration-200 ease-industrial focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
      dark ?
      'border-white/12 bg-ink-800 hover:border-accent' :
      'border-steel-200 bg-white hover:border-ink-900'}`
      }>
      
      <div className="flex items-start justify-between">
        <span
          className={`font-display text-xl uppercase leading-none tracking-tight ${
          dark ? 'text-white' : 'text-ink-900'}`
          }>
          
          {brand.shortName}
        </span>
        <ArrowUpRightIcon
          className={`h-4 w-4 transition-transform duration-200 ease-industrial group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
          dark ? 'text-accent-light' : 'text-steel-400 group-hover:text-accent'}`
          }
          aria-hidden="true" />
        
      </div>
      <div className="mt-8 flex items-end justify-between">
        <span className={`font-mono text-[10px] uppercase tracking-[0.16em] ${dark ? 'text-steel-400' : 'text-steel-500'}`}>
          {brand.origin}
        </span>
        <span className={`font-mono text-[11px] ${dark ? 'text-steel-300' : 'text-steel-600'}`}>
          {count} parts
        </span>
      </div>
    </Link>);

}