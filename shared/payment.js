// Shared by the Vercel functions (api/) and the admin UI (src/).
// Splits one pasted blob of payment info into individually copyable { label, value } fields.

const KNOWN_LABELS = [
  'bank', 'bank name', 'account name', 'account holder', 'account number', 'account no', 'acc no', 'bsb', 'swift',
  'iban', 'payid', 'pay id', 'reference', 'ref', 'description', 'amount', 'wallet', 'address', 'network',
  'usdt', 'btc', 'bitcoin', 'eth', 'ethereum', 'link', 'url', 'name', 'email',
];

const titleCase = (s) => s.replace(/\s+/g, ' ').trim().replace(/\b\w/g, (c) => c.toUpperCase());

export function parsePaymentDetail(blob) {
  const lines = String(blob || '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const fields = [];
  let bare = 0;
  for (const line of lines) {
    // Tier 1: "Label: value"
    const colon = line.match(/^([^:]{1,40}):\s*(.+)$/);
    if (colon && !/^https?$/i.test(colon[1])) {
      fields.push({ label: titleCase(colon[1]), value: colon[2].trim() });
      continue;
    }
    // Tier 2: starts with a known label word, e.g. "BSB 062-000"
    const lower = line.toLowerCase();
    const known = KNOWN_LABELS.filter((k) => lower.startsWith(k + ' ')).sort((a, b) => b.length - a.length)[0];
    if (known) {
      fields.push({ label: titleCase(known), value: line.slice(known.length).trim() });
      continue;
    }
    // Tier 3: bare line
    bare += 1;
    fields.push({ label: `Detail ${bare}`, value: line });
  }
  return fields;
}

export const PAYMENT_METHODS = ['Bank Transfer', 'Osko / PayID', 'Crypto'];

// Single source for the payment terms shown in the email, the public page and the composer preview.
export function paymentTermsLines(amountDue, orderNumber) {
  return [
    `Please pay the exact amount of ${amountDue} and use ${orderNumber} as your payment reference.`,
    'Once payment clears we dispatch your e-bike with free tracked delivery across Australia.',
  ];
}

// Order refs avoid look-alike characters (no 0/O/1/I/L).
export const ORDER_REF_RE = /^EBK-[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$/;
export function newOrderRef() {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const bytes = new Uint8Array(6);
  (globalThis.crypto || window.crypto).getRandomValues(bytes);
  return 'EBK-' + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
}
