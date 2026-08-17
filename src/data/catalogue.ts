import type { CategoryId } from '../types/catalogue';

/**
 * RAW CATALOGUE DATA — the source of truth for product applications.
 *
 * Each entry is [model, variant?]:
 *   model   → the vehicle model used for Brand → Model browsing
 *   variant → the exact application wording from the printed catalogue
 *             (front / rear / N/M / O/M / type, etc.)
 *
 * To extend the catalogue later, add a model entry here — the product objects,
 * routes, filters and search index are generated automatically in data/products.ts.
 */
export type CatalogueEntry = [model: string, variant?: string];

export type CatalogueBlock = {
  brand: string;
  entries: CatalogueEntry[];
};

export const catalogueByCategory: Record<CategoryId, CatalogueBlock[]> = {
  'brake-disc': [
  {
    brand: 'Tata',
    entries: [
    ['Ace'],
    ['Super Ace'],
    ['Indica'],
    ['Indica', 'Vista'],
    ['Dicor'],
    ['Sumo'],
    ['Sumo', 'Grand'],
    ['207', 'DI'],
    ['207', 'EX'],
    ['Safari'],
    ['Safari', '2.2'],
    ['Winger'],
    ['Winger', 'N/M'],
    ['Tigor'],
    ['Tiago'],
    ['Punch'],
    ['Altroz'],
    ['Nexon'],
    ['Hexa'],
    ['Yodha'],
    ['Intra', 'V-30'],
    ['Intra', 'V10']]

  },
  {
    brand: 'Mahindra',
    entries: [
    ['Maxximo', 'N/M'],
    ['Maxximo', 'Passenger / Jeeto / Mini'],
    ['Bolero', 'N/M'],
    ['Bolero', 'Plus'],
    ['Bolero', 'BS6'],
    ['Bolero', 'BS6 Modified'],
    ['Xylo', 'Xylo / Genio'],
    ['Scorpio', 'M2 DI'],
    ['Scorpio', 'CRDE'],
    ['Scorpio', 'S-2 / S-6 / TUV 300'],
    ['Scorpio', 'S-4 / S-10'],
    ['Thar', 'Scorpio S-11 / Thar'],
    ['Logan'],
    ['XUV 500', 'Front'],
    ['XUV 500', 'Rear'],
    ['XUV 300', 'Front'],
    ['XUV 300', 'Rear'],
    ['Marazzo', 'Front'],
    ['Marazzo', 'Rear'],
    ['Supro'],
    ['KUV 100'],
    ['M-Hawk', 'RH'],
    ['M-Hawk', 'LH']]

  },
  {
    brand: 'Maruti Suzuki',
    entries: [
    ['Alto', 'N/M'],
    ['Alto', 'O/M'],
    ['Alto K10'],
    ['Wagon R'],
    ['Celerio'],
    ['Swift', 'DI'],
    ['Swift', 'N/M'],
    ['Dzire'],
    ['Ritz'],
    ['Eeco'],
    ['Versa'],
    ['Ignis'],
    ['Ertiga'],
    ['800', '800 / Zen'],
    ['S-Cross'],
    ['SX4'],
    ['Brezza'],
    ['Baleno'],
    ['Super Carry']]

  },
  {
    brand: 'Hyundai',
    entries: [
    ['Santro', 'N/M'],
    ['i10'],
    ['Grand i10'],
    ['i20'],
    ['Elite'],
    ['Accent'],
    ['Verna'],
    ['Verna', 'Fluidic'],
    ['Creta'],
    ['Eon']]

  },
  {
    brand: 'Toyota',
    entries: [
    ['Innova'],
    ['Innova Crysta'],
    ['Qualis'],
    ['Etios', 'Etios / Liva'],
    ['Corolla', 'Front'],
    ['Corolla', 'Rear'],
    ['Altis', 'Front'],
    ['Altis', 'Rear'],
    ['Fortuner', 'Type-2 N/M'],
    ['Fortuner', 'Type-3 Front'],
    ['Fortuner', 'Type-3 Rear']]

  },
  {
    brand: 'Force',
    entries: [
    ['Trax', 'N/M'],
    ['Cruiser'],
    ['Cruiser', 'Type 2'],
    ['Judo'],
    ['Kargo King'],
    ['Toofan'],
    ['Traveller'],
    ['Traveller', 'N/M'],
    ['Traveller', '2.5']]

  },
  {
    brand: 'Chevrolet',
    entries: [['Tavera'], ['Enjoy'], ['Beat', 'Beat / Aveo'], ['Captiva']]
  },
  {
    brand: 'Ashok Leyland',
    entries: [['Dost'], ['Dost', 'Plus'], ['Bada Dost'], ['Partner']]
  },
  {
    brand: 'Renault',
    entries: [['Duster'], ['Kwid'], ['Lodgy'], ['Triber']]
  },
  {
    brand: 'Nissan',
    entries: [['Micra'], ['Sunny'], ['Terrano'], ['Magnite']]
  },
  {
    brand: 'Ford',
    entries: [['Figo'], ['Ikon'], ['Fiesta'], ['EcoSport']]
  },
  {
    brand: 'Volkswagen',
    entries: [['Polo'], ['Vento'], ['Ameo']]
  },
  {
    brand: 'Honda',
    entries: [['City'], ['Amaze'], ['Brio'], ['Jazz'], ['WR-V']]
  }],


  'brake-drum': [
  {
    brand: 'Tata',
    entries: [['Ace'], ['Zip', 'Zip / Iris'], ['Sumo']]
  },
  {
    brand: 'Mahindra',
    entries: [
    ['Bolero'],
    ['Bolero', 'BS6 / Load King'],
    ['Jeeto'],
    ['Scorpio', '282 Dia Half Tapper'],
    ['Scorpio', 'S-2']]

  },
  {
    brand: 'Maruti Suzuki',
    entries: [['Eeco'], ['Van'], ['Super Carry']]
  },
  {
    brand: 'Ashok Leyland',
    entries: [['Dost'], ['Dost', 'Plus'], ['Bada Dost']]
  },
  {
    brand: 'Chevrolet',
    entries: [['Tavera']]
  },
  {
    brand: 'Force',
    entries: [
    ['Traveller', 'N/M'],
    ['Traveller', 'O/M']]

  },
  {
    brand: 'Toyota',
    entries: [['Innova']]
  }],


  'wheel-hub': [
  {
    brand: 'Tata',
    entries: [['Ace', 'Front Hub']]
  },
  {
    brand: 'Mahindra',
    entries: [
    ['Bolero', 'Front Pickup Hub'],
    ['Bolero', 'Rear Pickup Hub'],
    ['Bolero', 'Rear Axle Carrier'],
    ['Bolero', 'Rear Axle Carrier N/M']]

  },
  {
    brand: 'Ashok Leyland',
    entries: [
    ['Dost', 'Front Hub'],
    ['Dost', 'Front Hub N/M'],
    ['Dost', 'Rear Hub'],
    ['Dost', 'Rear Hub N/M']]

  }]

};