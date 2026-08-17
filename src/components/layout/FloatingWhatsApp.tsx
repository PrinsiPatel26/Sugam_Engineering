import React from 'react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { generalInquiryMessage, whatsappUrl } from '../../utils/inquiry';

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl(generalInquiryMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SUGAM ENGINEERING on WhatsApp"
      className="fixed bottom-20 right-4 z-[70] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-ink-900/20 transition-transform duration-150 ease-industrial hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:bottom-6 md:right-6">
      
      <WhatsAppIcon className="h-7 w-7" />
    </a>);

}