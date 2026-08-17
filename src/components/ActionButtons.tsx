import React from 'react';
import { PhoneIcon, SendIcon } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { companyConfig } from '../config/company';
import { useInquiry } from '../contexts/InquiryContext';
import { generalInquiryMessage, productWhatsAppUrl, telHref, whatsappUrl } from '../utils/inquiry';
import type { Product } from '../types/catalogue';

type Size = 'sm' | 'md' | 'lg';
type Variant = 'primary' | 'dark' | 'outline' | 'outlineLight';

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-3 text-[11px] tracking-[0.12em]',
  md: 'h-11 px-5 text-xs tracking-[0.14em]',
  lg: 'h-12 px-7 text-xs tracking-[0.14em]'
};

const variantClasses: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-dark border border-transparent',
  dark: 'bg-ink-900 text-white hover:bg-ink-700 border border-transparent',
  outline: 'border border-steel-300 bg-white text-ink-900 hover:border-ink-900 hover:bg-steel-50',
  outlineLight: 'border border-white/25 text-white hover:bg-white/10 hover:border-white/60'
};

export const buttonBase =
'inline-flex items-center justify-center gap-2 font-semibold uppercase transition-colors duration-150 ease-industrial focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60';

function classes(size: Size, variant: Variant, className?: string) {
  return [buttonBase, sizeClasses[size], variantClasses[variant], className].filter(Boolean).join(' ');
}

interface ActionProps {
  size?: Size;
  variant?: Variant;
  className?: string;
  label?: string;
  fullWidth?: boolean;
}

interface WhatsAppProps extends ActionProps {
  product?: Product;
  context?: string;
}

export function WhatsAppButton({
  product,
  context,
  size = 'md',
  variant = 'outline',
  className,
  label = 'WhatsApp Inquiry',
  fullWidth
}: WhatsAppProps) {
  const href = product ? productWhatsAppUrl(product) : whatsappUrl(generalInquiryMessage(context));
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes(size, variant, `${fullWidth ? 'w-full' : ''} ${className ?? ''}`)}>
      
      <WhatsAppIcon className={`${size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-[#25D366]`} />
      {label}
    </a>);

}

export function CallButton({
  size = 'md',
  variant = 'outline',
  className,
  label = 'Call Now',
  fullWidth
}: ActionProps) {
  return (
    <a
      href={telHref}
      className={classes(size, variant, `${fullWidth ? 'w-full' : ''} ${className ?? ''}`)}
      aria-label={`Call ${companyConfig.name} on ${companyConfig.phoneDisplay}`}>
      
      <PhoneIcon className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      {label}
    </a>);

}

interface InquiryProps extends ActionProps {
  product?: Product;
  context?: string;
}

export function InquiryButton({
  product,
  context,
  size = 'md',
  variant = 'primary',
  className,
  label = 'Send Inquiry',
  fullWidth
}: InquiryProps) {
  const { openInquiry } = useInquiry();
  return (
    <button
      type="button"
      onClick={() => openInquiry({ product, context })}
      className={classes(size, variant, `${fullWidth ? 'w-full' : ''} ${className ?? ''}`)}>
      
      <SendIcon className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      {label}
    </button>);

}

export function buttonClasses(size: Size = 'md', variant: Variant = 'primary', className?: string) {
  return classes(size, variant, className);
}