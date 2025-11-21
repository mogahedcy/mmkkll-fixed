import { sanitizeHTML, validateURL } from './sanitizer';

export function renderSafeHTML(html: string, className?: string) {
  if (typeof window === 'undefined') return null;
  
  const clean = sanitizeHTML(html);
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}

export function createSafeLink(href: string, label: string) {
  if (!validateURL(href)) {
    return label;
  }
  return { href, label };
}
