import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

/** Lead form shown at the end of every blog post. Posts to the same enquiry endpoint as the contact page. */
export const BlogQuoteForm: React.FC<{ slug: string; title: string }> = ({ slug, title }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formName: 'contact',
          website: '',
          name: form.name,
          email: form.email,
          phone: form.phone,
          topic: `Quote request: ${title}`.slice(0, 120),
          message: `${form.message.trim() || 'Please send me a quote.'}\n\nSent from the blog post /blog/${slug}`,
        }),
      });
      if (!res.ok) throw new Error('failed');
      setSubmitted(true);
    } catch {
      setError('Your request could not be sent. Please email sales@ebikesale.com.au directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const field = 'w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600';

  return (
    <section aria-labelledby="quote-heading" className="mt-12 p-6 sm:p-8 bg-white rounded-2xl border border-emerald-200 shadow-xs">
      <h2 id="quote-heading" className="text-xl sm:text-2xl font-bold text-slate-900">Get a free quote</h2>
      <p className="text-sm text-slate-600 mt-1">
        Tell us the bike you have in mind and your delivery postcode. Our Australian team replies with the delivered price, including free delivery and the 10% bank transfer, Osko or crypto discount.
      </p>
      {submitted ? (
        <div className="mt-6 flex items-start gap-3 text-sm text-slate-700" role="status">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-900">Thanks, we have your request.</p>
            <p className="mt-1">We will email you your quote shortly. While you wait, <Link to="/shop" className="font-semibold text-emerald-700 hover:underline">browse the full range</Link>.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="bq-name" className="block font-medium text-slate-700 mb-1">Your name *</label>
              <input id="bq-name" required type="text" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} />
            </div>
            <div>
              <label htmlFor="bq-email" className="block font-medium text-slate-700 mb-1">Email address *</label>
              <input id="bq-email" required type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} />
            </div>
          </div>
          <div>
            <label htmlFor="bq-phone" className="block font-medium text-slate-700 mb-1">Phone (optional)</label>
            <input id="bq-phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={field} />
          </div>
          <div>
            <label htmlFor="bq-message" className="block font-medium text-slate-700 mb-1">Which bike, and where should we deliver? (optional)</label>
            <textarea id="bq-message" rows={3} placeholder="For example: TREK FX+ 2, delivery to Brisbane 4000" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={field} />
          </div>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          {error && <p className="text-red-700" role="alert">{error}</p>}
          <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold rounded-lg text-xs">
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? 'Sending...' : 'Send my quote request'}</span>
          </button>
        </form>
      )}
    </section>
  );
};
