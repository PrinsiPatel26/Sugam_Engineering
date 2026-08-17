import React from 'react';
import { industriesServed } from '../../data/content';

export function IndustriesServed() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="tech-grid-light absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-14">
          <div className="lg:w-1/3">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
              Industries Served
            </p>
            <h2 className="mt-3 font-display text-3xl uppercase leading-tight tracking-tight text-ink-900">
              Where our components run
            </h2>
          </div>
          <ul className="grid flex-1 grid-cols-2 gap-px border border-steel-200 bg-steel-200 sm:grid-cols-4">
            {industriesServed.map((industry) =>
            <li
              key={industry}
              className="flex min-h-[84px] items-center bg-white px-4 py-4 text-sm font-medium text-ink-800">
              
                {industry}
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>);

}