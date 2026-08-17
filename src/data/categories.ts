import { images } from './images';
import type { Category, CategoryId } from '../types/catalogue';

export const categories: Category[] = [
{
  id: 'brake-disc',
  name: 'Brake Disc',
  shortName: 'Disc',
  tagline: 'Vented, plain and disc brake rotors',
  description:
  'Precision-machined brake discs for passenger cars, utility vehicles and commercial applications. Supplied in vented and plain constructions with controlled thickness variation and run-out.',
  image: images.brakeDisc,
  bullets: [
  'Vented and plain constructions',
  'Machined braking surface',
  'Controlled run-out and thickness variation',
  'OEM-replacement and aftermarket fitment']

},
{
  id: 'brake-drum',
  name: 'Brake Drum',
  shortName: 'Drum',
  tagline: 'Dimensionally accurate cast drums',
  description:
  'Durable brake drums machined to consistent internal diameters for light commercial vehicles, load carriers, vans and utility vehicles.',
  image: images.brakeDrum,
  bullets: [
  'Consistent internal diameter',
  'Balanced, sturdy cast construction',
  'Machined mounting face and bolt holes',
  'Load carrier and van applications']

},
{
  id: 'wheel-hub',
  name: 'Wheel Hub',
  shortName: 'Hub',
  tagline: 'Front, rear and axle carrier hubs',
  description:
  'Wheel hubs and rear axle carriers machined for accurate bearing seats and stud pitch, supplied for pickup, load carrier and utility vehicle applications.',
  image: images.wheelHub,
  bullets: [
  'Accurate bearing seat machining',
  'Front, rear and axle carrier variants',
  'Consistent stud pitch circle',
  'Pickup and load carrier applications']

}];


export const categoryById: Record<CategoryId, Category> = categories.reduce(
  (acc, category) => ({ ...acc, [category.id]: category }),
  {} as Record<CategoryId, Category>
);

export function getCategory(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}