import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const captions = ['Product image', 'In production', 'Packing & dispatch'];

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative overflow-hidden border border-steel-200 bg-steel-100">
        <motion.img
          key={images[active]}
          src={images[active]}
          alt={`${name} — ${captions[active] ?? 'Product image'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="aspect-[4/3] w-full object-cover" />
        
        <span className="absolute bottom-0 left-0 bg-ink-900/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white">
          {captions[active] ?? 'Product image'}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {images.map((image, index) =>
        <button
          key={image}
          type="button"
          onClick={() => setActive(index)}
          aria-label={`Show ${captions[index] ?? `image ${index + 1}`}`}
          aria-current={index === active}
          className={`overflow-hidden border transition-colors duration-150 ease-industrial ${
          index === active ? 'border-accent' : 'border-steel-200 hover:border-steel-400'}`
          }>
          
            <img
            src={image}
            alt=""
            loading="lazy"
            className="aspect-[4/3] w-full object-cover" />
          
          </button>
        )}
      </div>
    </div>);

}