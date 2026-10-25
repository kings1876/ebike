import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Truck, RotateCcw, ShieldCheck, FileText, ArrowLeft } from 'lucide-react';

export const PolicyPage: React.FC<{ policyType?: 'shipping' | 'refund' | 'privacy' | 'terms' }> = ({
  policyType: propPolicyType
}) => {
  const { type: paramType } = useParams<{ type?: string }>();
  const type = propPolicyType || paramType || 'shipping';

  const contentMap: Record<string, { title: string; subtitle: string; icon: any; body: React.ReactNode }> = {
    shipping: {
      title: 'Australian Nationwide Shipping Policy',
      subtitle: '100% Free Door-to-Door Heavy Freight on all electric bicycles',
      icon: Truck,
      body: (
        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-2">100% Free Freight Across Australia</h3>
            <p>
              We provide completely free freight on all electric bicycles across all Australian states and territories: New South Wales, Victoria, Queensland, Western Australia, South Australia, Tasmania, Australian Capital Territory, and Northern Territory.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Tracked Carriers & Transit Times</h3>
            <p className="mb-2">
              All bikes are dispatched from our Australian warehouse via tracked heavy-carton freight partners (TNT/FedEx Australia, StarTrack Heavy, Northline).
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Sydney, Melbourne, Brisbane Metro:</strong> 2 – 4 Business Days</li>
              <li><strong>Adelaide, Perth, Hobart Metro:</strong> 3 – 5 Business Days</li>
              <li><strong>Regional NSW, VIC, QLD, SA:</strong> 4 – 7 Business Days</li>
              <li><strong>Regional WA, NT, Far North QLD:</strong> 6 – 9 Business Days</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Carton Assembly & Inspection</h3>
            <p>
              Your e-bike arrives 90% pre-assembled in an extra-thick export-grade carton. Simply mount the front wheel, handlebar, and pedals with the included multi-tool kit. Assembly requires approximately 15–25 minutes.
            </p>
          </div>
        </div>
      )
    },
    refund: {
      title: '30-Day Risk-Free Trial & Refund Policy',
      subtitle: 'Complete peace of mind backed by Australian Consumer Law',
      icon: RotateCcw,
      body: (
        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-2">30-Day Home Trial Guarantee</h3>
            <p>
              We want you to ride with total confidence. If for any reason your electric bicycle does not suit your lifestyle within 30 days of delivery, you can return it to our Australian service center for an exchange or full refund.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Return Conditions</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>The bicycle must be in clean, undamaged condition with fewer than 30 km on the digital display odometer.</li>
              <li>Keep original packaging, chargers, keys, tools, and manuals.</li>
              <li>Contact our team at <code>sales@ebikesale.com.au</code> to obtain your return consignment label.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Australian Consumer Law (ACL) Guarantees</h3>
            <p>
              Our goods come with guarantees that cannot be excluded under the Australian Consumer Law. You are entitled to a replacement or refund for a major failure and compensation for any other reasonably foreseeable loss or damage.
            </p>
          </div>
        </div>
      )
    },
    privacy: {
      title: 'Privacy Policy (Australian Privacy Principles)',
      subtitle: 'Committed to safeguarding your personal data under the Privacy Act 1988 (Cth)',
      icon: ShieldCheck,
      body: (
        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Our Commitment to Privacy</h3>
            <p>
              E Bikes for Sale strictly complies with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). We never sell, rent, or trade your personal information to third parties.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Information We Collect</h3>
            <p>
              When you submit an order form or contact our workshop, we collect your name, email, phone number, and physical Australian delivery address to fulfill freight, process warranty registration, and provide technical assistance.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Data Security</h3>
            <p>
              All interactions and transactions are encrypted with 256-bit SSL encryption. We do not store credit card numbers on our servers.
            </p>
          </div>
        </div>
      )
    },
    terms: {
      title: 'Terms of Service & Australian Road Regulations',
      subtitle: 'EN15194 Pedelec standards, power ratings, and customer terms',
      icon: FileText,
      body: (
        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Australian E-Bike Road Legality (EN15194)</h3>
            <p>
              Our 250W commuter and step-through electric bicycles are certified under standard EN15194 (250W continuous rated motor with pedal assist cutoff at 25 km/h). They are 100% road legal on Australian public roads and shared paths without a license, registration, or compulsory third party (CTP) insurance.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-base mb-2">High-Power Off-Road Models (500W–750W)</h3>
            <p>
              Higher power e-MTB models (500W to 750W) feature programmable speed controls. Full power modes are intended for private property, dedicated trail centers, and off-road courses where permitted by local laws.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-base mb-2">2-Year Comprehensive Warranty</h3>
            <p>
              Every new e-bike is warranted against frame, motor, and controller defects for 24 months, with an 18-month warranty on lithium battery packs.
            </p>
          </div>
        </div>
      )
    }
  };

  const active = contentMap[type] || contentMap.shipping;
  const Icon = active.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Home</span>
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{active.title}</h1>
            <p className="text-xs text-slate-500 mt-0.5">{active.subtitle}</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100">
          {active.body}
        </div>

        <p className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
          Questions about this policy? Email sales@ebikesale.com.au or use the <Link to="/contact" className="font-semibold text-emerald-700 hover:underline">contact page</Link>.
          You can also browse our <Link to="/shop" className="font-semibold text-emerald-700 hover:underline">electric bikes for sale</Link>,
          read the <Link to="/blog" className="font-semibold text-emerald-700 hover:underline">buying guides</Link> or check the <Link to="/faq" className="font-semibold text-emerald-700 hover:underline">FAQ</Link>.
        </p>
      </div>
    </div>
  );
};
