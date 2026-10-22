import nodemailer from 'nodemailer';
import { SITE } from './config.js';

let transport;

export const isMailConfigured = () =>
  Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

function getTransport() {
  if (!isMailConfigured()) return null;
  if (!transport) {
    const port = Number(process.env.SMTP_PORT || 465);
    transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transport;
}

// Never throws: returns { sent:false } when unconfigured or the SMTP server rejects.
export async function sendMail({ to, subject, html, text, replyTo }) {
  const t = getTransport();
  if (!t) return { sent: false, reason: 'not-configured' };
  try {
    await t.sendMail({
      from: `"${SITE.name}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text,
      replyTo: replyTo || SITE.salesEmail,
    });
    return { sent: true };
  } catch (err) {
    console.error('sendMail failed:', err && err.message);
    return { sent: false, reason: 'smtp-error' };
  }
}
