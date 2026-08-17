import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon, XIcon } from 'lucide-react';
import { searchProducts } from '../data/products';

interface SearchBarProps {
  tone?: 'light' | 'dark';
  placeholder?: string;
  autoFocus?: boolean;
  onNavigate?: () => void;
}

export function SearchBar({
  tone = 'light',
  placeholder = 'Search “Tata Ace”, “Bolero”, “Brake Drum”…',
  autoFocus,
  onNavigate
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const dark = tone === 'dark';

  const results = useMemo(() => query.trim().length > 1 ? searchProducts(query, 6) : [], [query]);
  const total = useMemo(() => query.trim().length > 1 ? searchProducts(query).length : 0, [query]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;
    setOpen(false);
    onNavigate?.();
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={submit} role="search">
        <label htmlFor="global-search" className="sr-only">
          Search products
        </label>
        <div
          className={`flex items-center gap-2 border px-3 ${
          dark ? 'border-white/20 bg-white/5' : 'border-steel-300 bg-white'}`
          }>
          
          <SearchIcon className={`h-4 w-4 shrink-0 ${dark ? 'text-steel-400' : 'text-steel-500'}`} />
          <input
            id="global-search"
            value={query}
            autoFocus={autoFocus}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className={`h-11 w-full bg-transparent text-sm focus:outline-none ${
            dark ?
            'text-white placeholder:text-steel-400' :
            'text-ink-900 placeholder:text-steel-400'}`
            } />
          
          {query &&
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className={dark ? 'text-steel-400 hover:text-white' : 'text-steel-400 hover:text-ink-900'}>
            
              <XIcon className="h-4 w-4" />
            </button>
          }
        </div>
      </form>

      {open && results.length > 0 &&
      <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-96 overflow-y-auto border border-steel-200 bg-white shadow-xl">
          <ul>
            {results.map((product) =>
          <li key={product.id}>
                <Link
              to={`/product/${product.id}`}
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className="flex items-center gap-3 border-b border-steel-100 px-3 py-2.5 transition-colors duration-150 ease-industrial hover:bg-steel-50">
              
                  <img
                src={product.images[0]}
                alt=""
                className="h-11 w-11 shrink-0 object-cover"
                loading="lazy" />
              
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-ink-900">
                      {product.name}
                    </span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-steel-500">
                      {product.categoryName} · {product.brand}
                    </span>
                  </span>
                </Link>
              </li>
          )}
          </ul>
          <button
          type="button"
          onClick={() => {
            setOpen(false);
            onNavigate?.();
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
          }}
          className="w-full bg-steel-50 px-3 py-2.5 text-left font-mono text-[11px] uppercase tracking-[0.14em] text-accent hover:bg-steel-100">
          
            View all {total} results
          </button>
        </div>
      }
    </div>);

}