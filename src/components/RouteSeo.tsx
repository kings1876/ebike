import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadProductDetail } from '../data/catalogue';

const setMeta = (selector: string, attrs: Record<string, string>, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/** Keeps title, description, canonical, robots and JSON-LD in step with the current route. */
let firstRun = true;

export const RouteSeo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let cancelled = false;
    // The metadata module (blog text, FAQ copy) and, for product pages, the product details load on demand.
    // First loads already have correct tags from the prerendered HTML.
    // The first load already carries the right tags, so wait until the page is painted and busy work is done.
    const delay = firstRun ? 3000 : 0;
    firstRun = false;
    const timer = setTimeout(() => (async () => {
      const [{ getRouteMeta }, details] = await Promise.all([
        import('../data/seo-meta'),
        pathname.startsWith('/product/') ? loadProductDetail(pathname.split('/')[2]).catch(() => undefined) : Promise.resolve(undefined),
      ]);
      if (!cancelled) apply(getRouteMeta(pathname, details));
    })(), delay);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [pathname]);

  return null;
};

function apply(m: ReturnType<typeof import('../data/seo-meta').getRouteMeta>) {
  {
    document.title = m.title;
    if (m.description) {
      setMeta('meta[name="description"]', { name: 'description' }, m.description);
      setMeta('meta[property="og:description"]', { property: 'og:description' }, m.description);
      setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, m.description);
    }
    setMeta('meta[property="og:title"]', { property: 'og:title' }, m.title);
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, m.title);
    setMeta('meta[property="og:url"]', { property: 'og:url' }, m.canonical);
    setMeta('meta[name="robots"]', { name: 'robots' }, m.noindex ? 'noindex, nofollow' : 'index, follow');

    if (m.image) {
      setMeta('meta[property="og:image"]', { property: 'og:image' }, m.image);
      setMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, m.image);
    }

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = m.canonical;

    document.head.querySelectorAll('script[data-route-ld]').forEach((n) => n.remove());
    (m.jsonLd ?? []).forEach((obj) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.dataset.routeLd = '1';
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    });
  }
}
