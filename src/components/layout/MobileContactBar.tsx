import React from 'react';
import { PhoneIcon, SendIcon } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { generalInquiryMessage, telHref, whatsappUrl } from '../../utils/inquiry';
import { useInquiry } from '../../contexts/InquiryContext';

const itemClass =
'flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em]';

export function MobileContactBar() {
  const { openInquiry } = useInquiry();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[75] grid grid-cols-3 border-t border-white/10 bg-ink-900 text-white md:hidden">
      <a
        href={whatsappUrl(generalInquiryMessage())}
        target="_blank"
        rel="noopener noreferrer"
        className={itemClass}>
        
        <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
        WhatsApp
      </a>
      <a href={telHref} className={`${itemClass} border-x border-white/10`}>
        <PhoneIcon className="h-5 w-5 text-accent-light" />
        Call
      </a>
      <button type="button" onClick={() => openInquiry()} className={itemClass}>
        <SendIcon className="h-5 w-5 text-accent-light" />
        Inquiry
      </button>
    </div>);

}