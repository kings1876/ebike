import { checkAdminPasscode } from './_lib/auth.js';
import { sendMail } from './_lib/mailer.js';
import { SITE } from './_lib/config.js';
import { paymentDetailsEmail, enquiryReplyEmail } from './_lib/emails.js';
import {
  listOrders, listEnquiries, getOrder, saveOrder, deleteOrder,
  getEnquiry, saveEnquiry, deleteEnquiry, isStoreConfigured,
} from './_lib/store.js';
import { parsePaymentDetail } from '../shared/payment.js';

// Admin API, routed by ?r=orders|enquiries|send-payment|reply. Passcode is checked first, always.
export default async function handler(req, res) {
  const denied = checkAdminPasscode(req);
  if (denied) return res.status(denied.status).json({ error: denied.error });

  const r = String(req.query.r || '');
  const id = req.query.id ? String(req.query.id) : '';
  const store = isStoreConfigured();

  try {
    if (r === 'orders' || r === 'enquiries') {
      const isOrders = r === 'orders';
      if (req.method === 'GET') {
        if (id) {
          const rec = await (isOrders ? getOrder(id) : getEnquiry(id));
          return rec ? res.json(rec) : res.status(404).json({ error: 'Not found' });
        }
        const rows = await (isOrders ? listOrders() : listEnquiries());
        return res.json({ store, rows });
      }
      if (req.method === 'DELETE' && id) {
        await (isOrders ? deleteOrder(id) : deleteEnquiry(id));
        return res.json({ success: true });
      }
    }

    if (r === 'send-payment' && req.method === 'POST') {
      const { orderNumber, method, detail } = req.body || {};
      const order = await getOrder(String(orderNumber || ''));
      if (!order) return res.status(404).json({ error: 'Order not found' });
      const fields = parsePaymentDetail(detail);
      if (!fields.length) return res.status(400).json({ error: 'Paste the payment details first' });
      const details = { method: String(method || order.paymentMethod), detail: String(detail), fields, sentAt: new Date().toISOString() };
      const mail = await sendMail({
        to: order.customerEmail,
        subject: `Payment details for order ${order.orderNumber} — ${SITE.name}`,
        html: paymentDetailsEmail(order, details),
      });
      if (!mail.sent) return res.status(502).json({ error: 'Email could not be sent. Check the SMTP settings.' });
      await saveOrder({ ...order, status: order.status === 'payment-confirmed' ? order.status : 'payment-sent', paymentDetails: details });
      return res.json({ success: true });
    }

    if (r === 'reply' && req.method === 'POST') {
      const { id: enqId, message } = req.body || {};
      const enq = await getEnquiry(String(enqId || ''));
      if (!enq) return res.status(404).json({ error: 'Enquiry not found' });
      const text = String(message || '').trim();
      if (!text) return res.status(400).json({ error: 'Write a reply first' });
      const mail = await sendMail({ to: enq.email, subject: `Re: ${enq.topic || 'your enquiry'} — ${SITE.name}`, html: enquiryReplyEmail(enq, text) });
      if (!mail.sent) return res.status(502).json({ error: 'Email could not be sent. Check the SMTP settings.' });
      await saveEnquiry({ ...enq, status: 'replied', repliedAt: new Date().toISOString() });
      return res.json({ success: true });
    }
  } catch (e) {
    console.error('admin api', e.message);
    return res.status(500).json({ error: 'Server error' });
  }
  return res.status(404).json({ error: 'Unknown route' });
}
