import React from 'react';
import { motion } from 'framer-motion';
import { PackageSearchIcon } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { InquiryButton, WhatsAppButton } from './ActionButtons';
import type { Product } from '../types/catalogue';

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="flex flex-col items-center border border-dashed border-steel-300 bg-steel-50 px-6 py-16 text-center">
        <PackageSearchIcon className="h-10 w-10 text-steel-400" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl uppercase tracking-wide text-ink-900">
          No matching products
        </h3>
        <p className="mt-2 max-w-md text-sm text-steel-600">
          Our catalogue covers a wide range of applications beyond what is listed online. Send us the
          vehicle model and part you need and our team will confirm availability.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <InquiryButton context="a specific vehicle application" label="Send Requirement" />
          <WhatsAppButton context="a specific vehicle application" label="WhatsApp Us" />
        </div>
      </div>);

  }

  return (
    <div
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ${
      columns === 4 ? 'xl:grid-cols-4' : ''}`
      }>
      
      {products.map((product, index) =>
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.28,
          ease: [0.23, 1, 0.32, 1],
          delay: Math.min(index, 7) * 0.035
        }}
        className="h-full">
        
          <ProductCard product={product} />
        </motion.div>
      )}
    </div>);

}