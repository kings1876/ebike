import { getOrder } from './_lib/store.js';
import { ORDER_REF_RE } from '../shared/payment.js';

// Public: the order number is the token. Exposes only what the customer's own payment email already contained.
export default async function handler(req, res) {
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
  });
}
