import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { InquiryForm } from './InquiryForm';
import type { Product } from '../types/catalogue';

interface InquiryModalProps {
  open: boolean;
  product?: Product;
  context?: string;
  onClose: () => void;
}

export function InquiryModal({ open, product, context, onClose }: InquiryModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:p-8">
          <motion.div
          className="fixed inset-0 bg-ink-950/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose} />
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Send inquiry"
          className="relative z-10 w-full max-w-3xl border border-steel-200 bg-white shadow-2xl"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}>
          
            <div className="flex items-start justify-between border-b border-steel-200 bg-ink-900 px-6 py-5 text-white">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-light">
                  Business Enquiry
                </p>
                <h2 className="mt-1 font-display text-2xl uppercase tracking-wide">
                  {product ? product.name : 'Send Your Requirement'}
                </h2>
                {product &&
              <p className="mt-1 text-xs text-steel-300">
                    {product.categoryName} · {product.application}
                  </p>
              }
              </div>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close enquiry form"
              className="ml-4 border border-white/20 p-2 text-white transition-colors duration-150 ease-industrial hover:bg-white/10">
              
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
              <InquiryForm product={product} context={context} />
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}