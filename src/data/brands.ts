import { slugify } from '../utils/slug';
import type { Brand } from '../types/catalogue';

const brandMeta: Record<string, {shortName: string;origin: string;}> = {
  Tata: { shortName: 'TATA', origin: 'India' },
  Mahindra: { shortName: 'MAHINDRA', origin: 'India' },
  'Maruti Suzuki': { shortName: 'MARUTI', origin: 'India / Japan' },
  Hyundai: { shortName: 'HYUNDAI', origin: 'South Korea' },
  Toyota: { shortName: 'TOYOTA', origin: 'Japan' },
  Force: { shortName: 'FORCE', origin: 'India' },
  Chevrolet: { shortName: 'CHEVROLET', origin: 'USA' },
  'Ashok Leyland': { shortName: 'ASHOK LEYLAND', origin: 'India' },
  Renault: { shortName: 'RENAULT', origin: 'France' },
  Nissan: { shortName: 'NISSAN', origin: 'Japan' },
  Ford: { shortName: 'FORD', origin: 'USA' },
  Volkswagen: { shortName: 'VOLKSWAGEN', origin: 'Germany' },
  Honda: { shortName: 'HONDA', origin: 'Japan' }
};

export function buildBrand(name: string): Brand {
  const meta = brandMeta[name] ?? { shortName: name.toUpperCase(), origin: 'International' };
  return {
    slug: slugify(name),
    name,
    shortName: meta.shortName,
    origin: meta.origin
  };
}