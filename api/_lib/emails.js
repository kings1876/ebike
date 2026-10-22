import { SITE, origin } from './config.js';
import { paymentTermsLines } from '../../shared/payment.js';

// Light shell only: white body, dark brand header band, brand colour as accent.
// Dark email bodies get force-inverted by Zoho / Gmail dark mode.
export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const { primary, headerDark } = SITE.brand;

const shell = (title, inner) => `<!doctype html><html><body style="margin:0;padding:24px 12px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
<tr><td style="background:${headerDark};padding:20px 28px"><div style="font-size:18px;font-weight:800;letter-spacing:.5px;color:#ffffff">${esc(SITE.name.toUpperCase())}</div>
<div style="font-size:12px;color:${primary};margin-top:2px;font-weight:700">${esc(title)}</div></td></tr>
<tr><td style="padding:28px;font-size:14px;line-height:1.6;color:#0f172a">${inner}</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #e2e8f0;font-size:12px;color:#475569">${esc(SITE.name)} · <a href="mailto:${SITE.salesEmail}" style="color:${primary}">${SITE.salesEmail}</a> · <a href="${origin()}" style="color:${primary}">${SITE.domain}</a></td></tr>
</table></td></tr></table></body></html>`;

const field = (label, value) =>
  `<tr><td style="padding:6px 0;color:#475569;width:150px;vertical-align:top;font-size:13px">${esc(label)}</td><td style="padding:6px 0;font-weight:600;font-size:14px">${value}</td></tr>`;
const table = (rows) => `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows.join('')}</table>`;
const callout = (html) => `<div style="margin:18px 0;padding:14px 16px;background:#ecfdf5;border-left:4px solid ${primary};border-radius:6px;font-size:13px">${html}</div>`;
const button = (href, label) =>
  `<p style="margin:22px 0"><a href="${esc(href)}" style="display:inline-block;background:${primary};color:#ffffff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:8px">${esc(label)}</a></p>`;

const money = (n) => `$${Number(n).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${SITE.currency}`;
const itemsHtml = (items) =>
  items.map((i) => `${esc(i.quantity)} × ${esc(i.name)}${i.variant ? ` <span style="color:#475569">(${esc(i.variant)})</span>` : ''} — ${money(i.price * i.quantity)}`).join('<br>');

export function orderNotificationEmail(o) {
  return shell('New order received', `
    <p style="margin:0 0 12px">A new order <strong>${esc(o.orderNumber)}</strong> was placed on the website.</p>
    ${table([
      field('Customer', esc(o.customerName)),
      field('Email', `<a href="mailto:${esc(o.customerEmail)}" style="color:${primary}">${esc(o.customerEmail)}</a>`),
      field('Phone', esc(o.customerPhone)),
      field('Deliver to', esc(o.address)),
      field('Payment method', esc(o.paymentMethod)),
      field('Items', itemsHtml(o.items)),
      field('Amount due', money(o.amountDue)),
      field('Notes', esc(o.notes || 'None')),
    ])}
    ${button(`${origin()}/admin/orders`, 'Reply in Dashboard →')}`);
}

export function orderConfirmationEmail(o) {
  return shell('Order received', `
    <p style="margin:0 0 12px">Hi ${esc(o.customerName)}, thanks for your order!</p>
    <p style="margin:0 0 12px">Your order reference is <strong>${esc(o.orderNumber)}</strong>.</p>
    ${table([field('Items', itemsHtml(o.items)), field('Amount due', money(o.amountDue)), field('Payment method', esc(o.paymentMethod))])}
    ${callout('<strong>What happens next:</strong> watch for a follow-up email from us with your payment details. Your e-bike is dispatched once payment clears.')}
    <p style="margin:0">Questions? Just reply to this email.</p>`);
}

export function paymentDetailsEmail(o, details) {
  const rows = details.fields.map((f) => field(f.label, esc(f.value)));
  const terms = paymentTermsLines(money(o.amountDue), o.orderNumber).map((t) => `<li>${esc(t)}</li>`).join('');
  const link = `${origin()}/order/payment-details?id=${encodeURIComponent(o.orderNumber)}`;
  return shell('Payment details', `
    <p style="margin:0 0 12px">Hi ${esc(o.customerName)}, here are the payment details for order <strong>${esc(o.orderNumber)}</strong> (${esc(details.method)}).</p>
    ${table([field('Amount due', money(o.amountDue)), ...rows])}
    ${button(link, 'Open payment page (tap to copy each detail)')}
    <ul style="margin:0 0 12px;padding-left:20px">${terms}</ul>`);
}

export function enquiryNotificationEmail(q) {
  return shell(`New ${q.type} enquiry`, `
    ${table([field('Name', esc(q.name)), field('Email', `<a href="mailto:${esc(q.email)}" style="color:${primary}">${esc(q.email)}</a>`), field('Phone', esc(q.phone || '—')), field('Topic', esc(q.topic || '—'))])}
    <p style="margin:14px 0 4px;color:#475569;font-size:13px">Message</p>
    <p style="margin:0;white-space:pre-wrap">${esc(q.message)}</p>
    ${button(`${origin()}/admin/enquiries`, 'Reply in Dashboard →')}`);
}

export function enquiryReplyEmail(q, reply) {
  return shell('Reply to your enquiry', `
    <p style="margin:0 0 12px">Hi ${esc(q.name)},</p>
    <p style="margin:0 0 16px;white-space:pre-wrap">${esc(reply)}</p>
    <div style="border-top:1px solid #e2e8f0;padding-top:12px;font-size:12px;color:#475569">Your original message:<br><em style="white-space:pre-wrap">${esc(q.message)}</em></div>`);
}
