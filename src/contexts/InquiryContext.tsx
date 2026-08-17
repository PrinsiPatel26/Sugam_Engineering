import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { InquiryModal } from '../components/InquiryModal';
import type { Product } from '../types/catalogue';

interface InquiryState {
  open: boolean;
  product?: Product;
  context?: string;
}

interface InquiryContextValue {
  openInquiry: (options?: {product?: Product;context?: string;}) => void;
  closeInquiry: () => void;
}

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function InquiryProvider({ children }: {children: React.ReactNode;}) {
  const [state, setState] = useState<InquiryState>({ open: false });

  const openInquiry = useCallback((options?: {product?: Product;context?: string;}) => {
    setState({ open: true, product: options?.product, context: options?.context });
  }, []);

  const closeInquiry = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  const value = useMemo(() => ({ openInquiry, closeInquiry }), [openInquiry, closeInquiry]);

  return (
    <InquiryContext.Provider value={value}>
      {children}
      <InquiryModal
        open={state.open}
        product={state.product}
        context={state.context}
        onClose={closeInquiry} />
      
    </InquiryContext.Provider>);

}

export function useInquiry(): InquiryContextValue {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error('useInquiry must be used within an InquiryProvider');
  return ctx;
}