import { companyConfig } from '../config/company';
import type { Product } from '../types/catalogue';

export function whatsappUrl(message: string): string {
  return `https://wa.me/${companyConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const telHref = `tel:${companyConfig.phone}`;

export function mailtoHref(subject: string, body?: string): string {
  const params = new URLSearchParams({ subject });
  if (body) params.set('body', body);
  return `mailto:${companyConfig.email}?${params.toString()}`;
}

export function productInquiryMessage(product: Product): string {
  const lines = [
  `Hello ${companyConfig.name}, I am interested in the ${product.name}.`,
  '',
  `Product: ${product.name}`,
  `Category: ${product.categoryName}`,
  `Vehicle Brand: ${product.brand}`,
  `Vehicle Model: ${product.model}`,
  `Application: ${product.application}`];

  if (product.partNumber) lines.push(`Part Number: ${product.partNumber}`);
  lines.push('', 'Please share product details, availability, MOQ and quotation.');
  return lines.join('\n');
}

export function productWhatsAppUrl(product: Product): string {
  return whatsappUrl(productInquiryMessage(product));
}

export function generalInquiryMessage(context?: string): string {
  return context ?
  `Hello ${companyConfig.name}, I would like to enquire about ${context}. Please share details, availability and quotation.` :
  `Hello ${companyConfig.name}, I would like to enquire about your automotive brake components. Please share your catalogue, availability and quotation.`;
}

export interface InquiryFormValues {
  name: string;
  company: string;
  mobile: string;
  email: string;
  country: string;
  vehicleBrand: string;
  vehicleModel: string;
  category: string;
  productName: string;
  quantity: string;
  message: string;
}

export function inquiryFormMessage(values: InquiryFormValues): string {
  const rows: [string, string][] = [
  ['Name', values.name],
  ['Company', values.company],
  ['Mobile', values.mobile],
  ['Email', values.email],
  ['Country', values.country],
  ['Vehicle Brand', values.vehicleBrand],
  ['Vehicle Model', values.vehicleModel],
  ['Product Category', values.category],
  ['Product', values.productName],
  ['Quantity Required', values.quantity],
  ['Requirement', values.message]];

  const body = rows.
  filter(([, value]) => value && value.trim().length > 0).
  map(([label, value]) => `${label}: ${value}`).
  join('\n');
  return `Hello ${companyConfig.name}, I would like to send an enquiry.\n\n${body}\n\nPlease share availability, MOQ, specifications and quotation.`;
}