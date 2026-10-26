import { getOrder, saveOrder } from './_lib/store.js';
import { sendMail } from './_lib/mailer.js';
import { paymentReportedEmail } from './_lib/emails.js';
import { orderInbox } from './_lib/config.js';
import { ORDER_REF_RE } from '../shared/payment.js';

const TX_RE = /^[A-Za-z0-9]{8,200}$/;

// Public: the order number is the token.
//  GET  ?id=  exposes only what the customer's own payment email already contained.
//  POST {id, txHash}  lets the customer report the crypto transaction they sent.
export default async function handler(req, res) {
  if (req.method === 'POST') return reportPayment(req, res);
  const id = String(req.query.id || '');
  if (req.method !== 'GET' || !ORDER_REF_RE.test(id)) return res.status(400).json({ error: 'Bad request' });
  const order = await getOrder(id).catch(() => null);
  if (!order || !order.paymentDetails) return res.status(404).json({ error: 'Payment details are not available yet' });
  res.setHeader('Cache-Control', 'no-store');
  return res.json({
    orderNumber: order.orderNumber,
    amountDue: order.amountDue,
    method: order.paymentDetails.method,
    fields: order.paymentDetails.fields,
    txReported: Boolean(order.txHash),
  });
}

async function reportPayment(req, res) {
  const b = req.body && typeof req.body === 'object' ? req.body : {};
  const id = String(b.id || '');
  const txHash = String(b.txHash || '').trim();
  if (!ORDER_REF_RE.test(id) || !TX_RE.test(txHash)) return res.status(400).json({ error: 'Enter the transaction ID exactly as your wallet shows it.' });
  const order = await getOrder(id).catch(() => null);
  if (!order || order.paymentDetails?.method !== 'Crypto') return res.status(404).json({ error: 'Order not found' });
  if (order.status === 'payment-confirmed') return res.json({ success: true });
  await saveOrder({ ...order, txHash, txReportedAt: new Date().toISOString(), status: 'payment-reported' });
  await sendMail({ to: orderInbox(), subject: `Payment reported for ${order.orderNumber} — ${order.customerName}`, html: paymentReportedEmail(order, txHash), replyTo: order.customerEmail });
  return res.json({ success: true });
}
