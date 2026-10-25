/**
 * Shrinks the prerendered HTML that crawlers read:
 *  1. Default Lucide attributes (xmlns, size, fill, stroke...) are dropped; src/index.css supplies them.
 *  2. Repeated icon bodies become <use> references to a single hidden sprite.
 */
export function shareIcons(input: string): string {
  const body = input.replace(/<svg\b([^>]*)>/g, (m, attrs: string) => {
    if (!/class="[^"]*\blucide\b/.test(attrs)) return m;
    const kept = attrs
      .replace(/\sxmlns="[^"]*"/, '')
      .replace(/\s(?:width|height)="24"/g, '')
      .replace(/\sfill="none"/, '')
      .replace(/\sstroke="currentColor"/, '')
      .replace(/\sstroke-width="2"/, '')
      .replace(/\sstroke-linecap="round"/, '')
      .replace(/\sstroke-linejoin="round"/, '');
    return `<svg${kept}>`;
  });

  const symbols = new Map<string, string>();
  const out = body.replace(/(<svg\b[^>]*>)([\s\S]*?)(<\/svg>)/g, (m, open: string, inner: string, close: string) => {
    if (inner.length < 120 || /<use\b/.test(inner)) return m;
    let id = symbols.get(inner);
    if (!id) {
      id = `ic${symbols.size}`;
      symbols.set(inner, id);
    }
    return `${open}<use href="#${id}"/>${close}`;
  });
  if (!symbols.size) return out;
  const sprite = [...symbols].map(([inner, id]) => `<symbol id="${id}" viewBox="0 0 24 24">${inner}</symbol>`).join('');
  return `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">${sprite}</svg>${out}`;
}

/** Interaction-only utility classes (hover, focus, transitions...) change nothing before JavaScript runs, so crawlers do not need them. */
const DROP = /^(?:(?:hover|focus|focus-visible|focus-within|active|group-hover|disabled|peer-[a-z]+|selection|placeholder):|transition(?:-[a-z]+)?$|duration-\d+$|ease-[a-z-]+$|cursor-pointer$|select-none$)/;
export function trimInteractionClasses(html: string): string {
  return html.replace(/ class="([^"]*)"/g, (m, cls: string) => {
    const kept = cls.split(/\s+/).filter((c) => c && !DROP.test(c));
    return kept.length ? ` class="${kept.join(' ')}"` : '';
  });
}
