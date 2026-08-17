import React from 'react';
import { Hero } from '../components/home/Hero';
import { VehicleFinder } from '../components/home/VehicleFinder';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { BrandStrip } from '../components/home/BrandStrip';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { ManufacturingStrength } from '../components/home/ManufacturingStrength';
import { QualityHighlights } from '../components/home/QualityHighlights';
import { IndustriesServed } from '../components/home/IndustriesServed';
import { WhyChoose } from '../components/home/WhyChoose';
import { CTASection } from '../components/CTASection';
import { useSeo } from '../hooks/useSeo';

export function Home() {
  useSeo({
    title: 'R.M. Engineering | Automotive Brake Disc, Brake Drum & Wheel Hub Manufacturer',
    description:
    'R.M. Engineering is a manufacturer and exporter of automotive brake discs, brake drums, wheel hubs and spare components for passenger cars, commercial vehicles and utility vehicles.'
  });

  return (
    <>
      <Hero />
      <VehicleFinder />
      <CategoryShowcase />
      <BrandStrip />
      <FeaturedProducts />
      <ManufacturingStrength />
      <QualityHighlights />
      <IndustriesServed />
      <WhyChoose />
      <CTASection />
    </>);

}