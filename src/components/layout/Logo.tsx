import React from 'react';
import { Link } from 'react-router-dom';
import { companyConfig } from '../../config/company';
import { images } from '../../data/images';

interface LogoProps {
  tone?: 'light' | 'dark';
  compact?: boolean;
}

export function Logo({ tone = 'dark', compact }: LogoProps) {
  const light = tone === 'light';
  return (
    <Link
      to="/"
      className="group flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      aria-label={`${companyConfig.name} — home`}>
      
      <img
        src={images.logo}
        alt={`${companyConfig.name} logo`}
        className={`${compact ? 'h-9' : 'h-11'} object-contain`}
      />
      {!compact && (
        <span className="leading-none">
          <span
            className={`block font-mono text-[10px] uppercase tracking-[0.16em] ${
            light ? 'text-steel-600' : 'text-steel-300'}`}>
            
            Crafted for Performance
          </span>
        </span>
      )}
    </Link>);

}