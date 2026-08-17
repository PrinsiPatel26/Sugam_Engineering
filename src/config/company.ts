/**
 * SINGLE SOURCE OF TRUTH FOR ALL COMPANY CONTACT DETAILS.
 * Update the values here and they change everywhere on the website
 * (header, footer, product cards, WhatsApp links, inquiry forms, contact page).
 *
 * NOTE: phone / WhatsApp / email below are placeholders — replace them with the
 * company's live numbers before publishing.
 */
export const companyConfig = {
  name: 'SUGAM ENGINEERING',
  legalName: 'SUGAM ENGINEERING',
  tagline: 'Mfg. Auto Component',
  description:
  'Manufacturer and auto component supplier based in Rajkot, Gujarat.',

  // Digits only, with country code — used to build wa.me links
  whatsapp: '919428516064',
  whatsappDisplay: '+91 94285 16064',

  // Used for tel: links
  phone: '+919428516064',
  phoneDisplay: '+91 94285 16064',
  altPhone: '+919428516064',
  altPhoneDisplay: '+91 94285 16064',

  email: 'sugameng999@gmail.com',
  website: 'https://www.sugamengineering.co.in/',

  address: {
    line1: 'Zavdi, Gondal Road',
    line2: 'Rajkot – 360004',
    state: 'Gujarat',
    country: 'India'
  },
  addressFull: 'Zavdi, Gondal Road, Rajkot – 360004, Gujarat, India',
  mapsEmbedQuery: 'Zavdi, Gondal Road, Rajkot, Gujarat, India',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Zavdi%2C%20Gondal%20Road%2C%20Rajkot%2C%20Gujarat%2C%20India',

  businessHours: 'Monday – Saturday · 9:30 AM – 7:00 PM IST',
  businessType: 'Manufacturer · Auto Component Supplier'
} as const;

export type CompanyConfig = typeof companyConfig;