import React, { useMemo, useState } from 'react';
import { CheckCircle2Icon, SendIcon } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { categories } from '../data/categories';
import { brands, modelsForBrand } from '../data/products';
import { inquiryFormMessage, whatsappUrl } from '../utils/inquiry';
import type { InquiryFormValues } from '../utils/inquiry';
import type { Product } from '../types/catalogue';

interface InquiryFormProps {
  product?: Product;
  context?: string;
  onSubmitted?: () => void;
}

const emptyValues: InquiryFormValues = {
  name: '',
  company: '',
  mobile: '',
  email: '',
  country: 'India',
  vehicleBrand: '',
  vehicleModel: '',
  category: '',
  productName: '',
  quantity: '',
  message: ''
};

const labelClass = 'block text-[11px] font-semibold uppercase tracking-[0.14em] text-steel-600';
const fieldClass =
'mt-2 w-full border border-steel-300 bg-white px-3 py-2.5 text-sm text-ink-900 placeholder:text-steel-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent';

export function InquiryForm({ product, context, onSubmitted }: InquiryFormProps) {
  const [values, setValues] = useState<InquiryFormValues>(() => ({
    ...emptyValues,
    vehicleBrand: product?.brand ?? '',
    vehicleModel: product?.model ?? '',
    category: product?.categoryName ?? '',
    productName: product?.name ?? context ?? ''
  }));
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormValues, string>>>({});

  const brandModels = useMemo(() => {
    const brand = brands.find((item) => item.name === values.vehicleBrand);
    return brand ? modelsForBrand(brand.slug) : [];
  }, [values.vehicleBrand]);

  function update<K extends keyof InquiryFormValues>(key: K, value: InquiryFormValues[K]) {
    setValues((prev) => ({
      ...prev,
      [key]: value,
      ...(key === 'vehicleBrand' ? { vehicleModel: '' } : {})
    }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof InquiryFormValues, string>> = {};
    if (!values.name.trim()) next.name = 'Please enter your name';
    if (!/^[+\d][\d\s-]{7,}$/.test(values.mobile.trim())) next.mobile = 'Enter a valid mobile number';
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email.trim())) next.email = 'Enter a valid email';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    onSubmitted?.();
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center border border-steel-200 bg-steel-50 px-6 py-12 text-center">
        <CheckCircle2Icon className="h-10 w-10 text-accent" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl uppercase tracking-wide text-ink-900">
          Thank you for your enquiry
        </h3>
        <p className="mt-2 max-w-md text-sm text-steel-600">
          Thank you for your enquiry. Our team will contact you shortly with product details,
          availability and quotation.
        </p>
        <a
          href={whatsappUrl(inquiryFormMessage(values))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 border border-steel-300 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-900 transition-colors duration-150 ease-industrial hover:border-ink-900">
          
          <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
          Also send on WhatsApp
        </a>
      </div>);

  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="inq-name">
            Full Name *
          </label>
          <input
            id="inq-name"
            className={fieldClass}
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)} />
          
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="inq-company">
            Company Name
          </label>
          <input
            id="inq-company"
            className={fieldClass}
            value={values.company}
            onChange={(e) => update('company', e.target.value)}
            placeholder="Company / firm" />
          
        </div>
        <div>
          <label className={labelClass} htmlFor="inq-mobile">
            Mobile Number *
          </label>
          <input
            id="inq-mobile"
            type="tel"
            className={fieldClass}
            value={values.mobile}
            onChange={(e) => update('mobile', e.target.value)}
            placeholder="+91 00000 00000"
            aria-invalid={Boolean(errors.mobile)} />
          
          {errors.mobile && <p className="mt-1 text-xs text-red-600">{errors.mobile}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="inq-email">
            Email
          </label>
          <input
            id="inq-email"
            type="email"
            className={fieldClass}
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)} />
          
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="inq-country">
            Country
          </label>
          <input
            id="inq-country"
            className={fieldClass}
            value={values.country}
            onChange={(e) => update('country', e.target.value)}
            placeholder="Country" />
          
        </div>
        <div>
          <label className={labelClass} htmlFor="inq-quantity">
            Quantity Required
          </label>
          <input
            id="inq-quantity"
            className={fieldClass}
            value={values.quantity}
            onChange={(e) => update('quantity', e.target.value)}
            placeholder="e.g. 200 pcs / month" />
          
        </div>
        <div>
          <label className={labelClass} htmlFor="inq-brand">
            Vehicle Brand
          </label>
          <select
            id="inq-brand"
            className={fieldClass}
            value={values.vehicleBrand}
            onChange={(e) => update('vehicleBrand', e.target.value)}>
            
            <option value="">Select brand</option>
            {brands.map((brand) =>
            <option key={brand.slug} value={brand.name}>
                {brand.name}
              </option>
            )}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="inq-model">
            Vehicle Model
          </label>
          {brandModels.length ?
          <select
            id="inq-model"
            className={fieldClass}
            value={values.vehicleModel}
            onChange={(e) => update('vehicleModel', e.target.value)}>
            
              <option value="">Select model</option>
              {brandModels.map((model) =>
            <option key={model.modelSlug} value={model.model}>
                  {model.model}
                </option>
            )}
            </select> :

          <input
            id="inq-model"
            className={fieldClass}
            value={values.vehicleModel}
            onChange={(e) => update('vehicleModel', e.target.value)}
            placeholder="Model / application" />

          }
        </div>
        <div>
          <label className={labelClass} htmlFor="inq-category">
            Product Category
          </label>
          <select
            id="inq-category"
            className={fieldClass}
            value={values.category}
            onChange={(e) => update('category', e.target.value)}>
            
            <option value="">Select category</option>
            {categories.map((category) =>
            <option key={category.id} value={category.name}>
                {category.name}
              </option>
            )}
            <option value="Other Automotive Components">Other Automotive Components</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="inq-product">
            Product Name
          </label>
          <input
            id="inq-product"
            className={fieldClass}
            value={values.productName}
            onChange={(e) => update('productName', e.target.value)}
            placeholder="Product / part required" />
          
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="inq-message">
          Message / Requirement
        </label>
        <textarea
          id="inq-message"
          rows={4}
          className={fieldClass}
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Share your requirement, application details or specifications" />
        
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 bg-accent px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-150 ease-industrial hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
          
          <SendIcon className="h-4 w-4" />
          Send Inquiry
        </button>
        <a
          href={whatsappUrl(inquiryFormMessage(values))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 border border-steel-300 bg-white px-6 text-xs font-semibold uppercase tracking-[0.14em] text-ink-900 transition-colors duration-150 ease-industrial hover:border-ink-900 hover:bg-steel-50">
          
          <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
          Send via WhatsApp
        </a>
      </div>
      <p className="text-xs text-steel-500">
        We respond to enquiries on working days. Bulk, dealer, distributor and export enquiries are
        welcome.
      </p>
    </form>);

}