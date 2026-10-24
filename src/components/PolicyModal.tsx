import React from 'react';
import { X, ShieldCheck, Truck, RotateCcw, FileText } from 'lucide-react';

export type PolicyType = 'shipping' | 'refund' | 'privacy' | 'terms';

interface PolicyModalProps {
  type: PolicyType | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap: Record<PolicyType, { title: string; icon: any; body: React.ReactNode }> = {
    shipping: {
      title: 'Australian Nationwide Shipping Policy',
      icon: Truck,
      body: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p>
            <strong>100% Free Shipping on All Electric Bicycles:</strong> We deliver to every Australian street address across New South Wales, Victoria, Queensland, Western Australia, South Australia, Tasmania, Australian Capital Territory, and the Northern Territory without any freight surcharges.
          </p>
          <p>
            <strong>Logistics Partners:</strong> All consignments are managed through specialized heavy-carton freight carriers including TNT/FedEx Australia, StarTrack Heavy, and Northline Freight. Every package is fully insured against damage or loss during transit.
          </p>
          <p>
            <strong>Delivery Windows:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Sydney, Melbourne, Brisbane Metro: 2 – 4 Business Days</li>
            <li>Adelaide, Perth, Hobart Metro: 3 – 5 Business Days</li>
            <li>Regional NSW, VIC, QLD, SA: 4 – 7 Business Days</li>
            <li>Regional WA, NT, Far North QLD: 6 – 9 Business Days</li>
          </ul>
          <p>
            <strong>Tracking & Signature:</strong> You will receive real-time SMS and email tracking links upon dispatch. A signature is required upon delivery to ensure safety.
          </p>
        </div>
      )
    },
    refund: {
      title: '30-Day Risk-Free Trial & Refund Policy',
      icon: RotateCcw,
      body: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p>
            <strong>Ride with Confidence:</strong> We offer a 30-day risk-free home trial on all new electric bicycles. If you find your e-bike is not the right fit for your commute or trail riding style, you may request an exchange or full refund within 30 days of delivery.
          </p>
          <p>
            <strong>Conditions for Return:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The e-bike must be in clean, original working condition with fewer than 30 km on the digital odometer.</li>
            <li>All original accessories, keys, chargers, manuals, and packaging should be retained.</li>
            <li>Notify our Australian support team at <code>sales@ebikesale.com.au</code> to receive a return authorization label.</li>
          </ul>
          <p>
            <strong>Australian Consumer Law:</strong> Our goods come with guarantees that cannot be excluded under the Australian Consumer Law (ACL). You are entitled to a replacement or refund for a major failure and compensation for any other reasonably foreseeable loss or damage.
          </p>
        </div>
      )
    },
    privacy: {
      title: 'Privacy Policy (Australian Privacy Principles)',
      icon: ShieldCheck,
      body: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p>
            <strong>Commitment to Privacy:</strong> E Bikes for Sale complies strictly with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). We never sell, rent, or trade your personal data to external advertisers.
          </p>
          <p>
            <strong>Data Collected:</strong> When you place an order or contact us, we collect your name, contact phone number, delivery address, and payment method solely to process and ship your order and provide warranty tracking.
          </p>
          <p>
            <strong>Security:</strong> All order communications and data transmission are protected with 256-bit SSL encryption. We do not store raw credit card numbers or banking passwords on our servers.
          </p>
        </div>
      )
    },
    terms: {
      title: 'Terms of Service & Road Compliance',
      icon: FileText,
      body: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p>
            <strong>Australian Road Rules & EN15194:</strong> Electric bicycles designated as street legal (250W continuous rated motor with 25 km/h pedal assist cutoff) comply with European and Australian safety standard EN15194. Riders must observe all state helmet laws and road codes.
          </p>
          <p>
            <strong>Off-Road & Private Property Usage:</strong> High-power models (500W–750W) with programmable speed modes are intended for off-road trails, private land, and unsealed backcountry routes where permitted by local authorities.
          </p>
          <p>
            <strong>Pricing & Currency:</strong> All prices listed are in AUD (inclusive of applicable taxes and Australian GST where noted). We reserve the right to amend inventory pricing without prior notice.
          </p>
        </div>
      )
    }
  };

  const activePolicy = contentMap[type];
  const IconComponent = activePolicy.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden border border-slate-200">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <IconComponent className="w-5 h-5 text-emerald-600" />
            <span>{activePolicy.title}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          {activePolicy.body}
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Close Policy
          </button>
        </div>
      </div>
    </div>
  );
};
