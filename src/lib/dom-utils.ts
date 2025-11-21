import { sanitizeHTML, validateURL } from './sanitizer';

export function renderSafeHTML(html: string, className?: string): string {
  if (typeof window === 'undefined') return '';
  
  const clean = sanitizeHTML(html);
  return clean;
}

export function createSafeLink(href: string, label: string) {
  if (!validateURL(href)) {
    return label;
  }
  return { href, label };
}
