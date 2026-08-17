import { useEffect } from 'react';
import { companyConfig } from '../config/company';

interface SeoOptions {
  title: string;
  description: string;
}

function upsertMeta(name: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertProperty(property: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/** Sets document title + meta description for the current route. */
export function useSeo({ title, description }: SeoOptions): void {
  useEffect(() => {
    document.title = title;
    upsertMeta('description', description);
    upsertProperty('og:title', title);
    upsertProperty('og:description', description);
    upsertProperty('og:site_name', companyConfig.name);
    upsertProperty('og:type', 'website');

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
  }, [title, description]);
}