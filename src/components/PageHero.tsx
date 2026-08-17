import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import type { Crumb } from './Breadcrumb';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  image?: string;
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, description, crumbs, image, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink-900">
      {image ?
      <>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-ink-950/70" aria-hidden="true" />
        </> :

      <div className="tech-grid absolute inset-0" aria-hidden="true" />
      }
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {crumbs &&
        <div className="mb-6 [&_a]:text-steel-400 [&_li>span]:text-white">
            <Breadcrumb items={crumbs} />
          </div>
        }
        {eyebrow &&
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-light">
            {eyebrow}
          </p>
        }
        <h1 className="mt-3 max-w-4xl font-display text-4xl uppercase leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description &&
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-300">{description}</p>
        }
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>);

}