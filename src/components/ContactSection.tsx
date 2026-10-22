import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
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
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          topic: formData.subject,
          message: formData.message,
        }),
      });
      if (!res.ok) throw new Error('failed');
      setSubmitted(true);
    } catch {
      setError('Your message could not be sent. Please email sales@ebikesale.com.au directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="text-xs font-semibold text-emerald-700 uppercase tracking-widest">
          Australian Customer Care & Technical Team
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Contact Our Australian Team
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Have questions about sizing, battery range, EN15194 compliance, or placing a customized order? Our bicycle specialists are here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-lg">
            <h3 className="text-lg font-bold text-white">Australian Support Desk</h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Dispatch & Operations Center</div>
                  <div className="text-slate-400 mt-0.5">Sydney, New South Wales, Australia</div>
                  <div className="text-slate-400">Nationwide Free Freight to all Australian States</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Direct Order & Support Email</div>
                  <div className="text-slate-300 mt-0.5 font-mono">sales@ebikesale.com.au</div>
                  <div className="text-slate-400">Response time: Usually within 2 hours</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Australian Operating Hours</div>
                  <div className="text-slate-400 mt-0.5">Monday – Friday: 8:00 AM – 6:00 PM AEST</div>
                  <div className="text-slate-400">Saturday: 9:00 AM – 4:00 PM AEST</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400">
              Need instant answers? Check out our <span className="text-emerald-400 font-semibold">FAQ page</span> or click the chat bubble on the bottom right of your screen.
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="text-base font-bold text-slate-900 mb-2">Send Us a Direct Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Liam Henderson"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="liam@example.com.au"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="0412 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Topic / Subject *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="E-Bike Sizing & Recommendation">E-Bike Sizing & Recommendation</option>
                    <option value="Payment via Crypto or Osko">Payment via Crypto or Osko</option>
                    <option value="Delivery & Order Status">Delivery & Order Status</option>
                    <option value="Warranty & Parts Support">Warranty & Parts Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what e-bike or specifications you are considering, or how our team can help you today..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                ></textarea>
              </div>

              {error && <p role="alert" className="text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md text-xs active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Sending Message...' : 'Submit Inquiry'}</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Message Received!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you for contacting E Bikes for Sale. An Australian technical advisor will review your message and respond to <strong>{formData.email}</strong> promptly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
