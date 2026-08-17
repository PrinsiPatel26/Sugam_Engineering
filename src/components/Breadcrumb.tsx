import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumb({ items }: {items: Crumb[];}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-steel-500">
        <li>
          <Link to="/" className="transition-colors duration-150 ease-industrial hover:text-accent">
            Home
          </Link>
        </li>
        {items.map((item, index) =>
        <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            <ChevronRightIcon className="h-3 w-3 text-steel-400" aria-hidden="true" />
            {item.to ?
          <Link
            to={item.to}
            className="transition-colors duration-150 ease-industrial hover:text-accent">
            
                {item.label}
              </Link> :

          <span className="text-ink-900">{item.label}</span>
          }
          </li>
        )}
      </ol>
    </nav>);

}