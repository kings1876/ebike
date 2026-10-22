import { SITE, orderInbox, contactInbox } from './_lib/config.js';
import { sendMail } from './_lib/mailer.js';
import { saveOrder, saveEnquiry, isStoreConfigured } from './_lib/store.js';
import { orderNotificationEmail, orderConfirmationEmail, enquiryNotificationEmail } from './_lib/emails.js';
import { ORDER_REF_RE } from '../shared/payment.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const str = (v, max = 500) => String(v ?? '').trim().slice(0, max);

// One handler for the order form and the contact form (by `formName`).
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const b = req.body && typeof req.body === 'object' ? req.body : {};
  if (b.website) return res.status(200).json({ success: true }); // honeypot

  if (b.formName === 'order') return handleOrder(b, res);
  if (b.formName === 'contact') return handleContact(b, res);
  return res.status(400).json({ error: 'Unknown form' });
}

async function handleOrder(b, res) {
  const orderNumber = str(b.orderNumber, 20);
  const items = Array.isArray(b.items)
    ? b.items.slice(0, 50).map((i) => ({
        name: str(i.name, 200),
        variant: str(i.variant, 200),
        quantity: Math.max(1, Math.min(99, Number(i.quantity) || 1)),
        price: Math.max(0, Number(i.price) || 0),
      }))
    : [];
  const order = {
    orderNumber,
    customerName: str(b.customerName, 120),
    customerEmail: str(b.customerEmail, 200),
    customerPhone: str(b.customerPhone, 40),
    address: str(b.address, 400),
    paymentMethod: str(b.paymentMethod, 60),
    notes: str(b.notes, 1000),
    items,
    amountDue: Math.max(0, Number(b.amountDue) || 0),
    status: 'pending',
    channel: 'email',
    createdAt: new Date().toISOString(),
  };
  if (!ORDER_REF_RE.test(orderNumber) || !order.customerName || !EMAIL_RE.test(order.customerEmail) || !items.length) {
    return res.status(400).json({ error: 'Invalid order' });
  }

  const saved = await saveOrder(order).catch((e) => (console.error('saveOrder', e.message), false));
  const [admin, customer] = await Promise.all([
    sendMail({ to: orderInbox(), subject: `New order ${orderNumber} — ${order.customerName}`, html: orderNotificationEmail(order), replyTo: order.customerEmail }),
    // Unconditional: the customer always gets a confirmation.
    sendMail({ to: order.customerEmail, subject: `Order ${orderNumber} received — ${SITE.name}`, html: orderConfirmationEmail(order) }),
  ]);
  if (!saved && !admin.sent) return res.status(503).json({ error: 'Order service not configured' });
  return res.status(200).json({ success: true, saved, emailed: admin.sent, confirmationSent: customer.sent });
}

async function handleContact(b, res) {
  const enq = {
    id: `ENQ-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`,
    type: b.type === 'wholesale' ? 'wholesale' : 'contact',
    name: str(b.name, 120),
    email: str(b.email, 200),
    phone: str(b.phone, 40),
    topic: str(b.topic, 120),
    message: str(b.message, 4000),
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  if (!enq.name || !EMAIL_RE.test(enq.email) || !enq.message) return res.status(400).json({ error: 'Invalid enquiry' });

  const saved = await saveEnquiry(enq).catch((e) => (console.error('saveEnquiry', e.message), false));
  const mail = await sendMail({
    to: contactInbox(),
    subject: `Enquiry: ${enq.topic || 'General'} — ${enq.name}`,
    html: enquiryNotificationEmail(enq),
    replyTo: enq.email,
  });
  if (!saved && !mail.sent) return res.status(503).json({ error: 'Contact service not configured' });
  return res.status(200).json({ success: true, saved, emailed: mail.sent });
}
