import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, Copy } from 'lucide-react';
import { paymentTermsLines } from '../../shared/payment.js';

interface Details { orderNumber: string; amountDue: number; method: string; fields: { label: string; value: string }[] }

const CopyField: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const [done, setDone] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => { setDone(true); setTimeout(() => setDone(false), 2000); });
  };
  return (
    <button type="button" onClick={copy} aria-label={`Copy ${label}`}
      className="w-full flex items-center justify-between gap-3 text-left p-3 rounded-lg border border-slate-200 bg-white hover:border-emerald-500 cursor-pointer">
      <span className="min-w-0">
        <span className="block text-[11px] text-slate-500">{label}</span>
        <span className="block font-mono text-sm font-semibold text-slate-900 break-all">{value}</span>
      </span>
      <span className="shrink-0 flex items-center gap-1 text-xs text-emerald-700 font-semibold">
        {done ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{done ? 'Copied' : 'Copy'}
      </span>
    </button>
  );
};

export const PaymentDetailsPage: React.FC = () => {
  const [params] = useSearchParams();
  const id = params.get('id') || '';
  const [data, setData] = useState<Details | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex, nofollow';
    document.head.appendChild(m);
    return () => { m.remove(); };
  }, []);

  useEffect(() => {
    fetch(`/api/order?id=${encodeURIComponent(id)}`)
      .then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d.error); setData(d); })
      .catch((e) => setError(e.message || 'Not available'));
  }, [id]);

  const amount = data ? `$${data.amountDue.toLocaleString('en-AU', { minimumFractionDigits: 2 })} AUD` : '';

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-5">
      <h1 className="text-2xl font-extrabold text-slate-900">Payment details</h1>
      {error && <p className="text-sm text-slate-600">{error}. If you have just ordered, watch your inbox for our payment details email.</p>}
      {data && (
        <>
          <p className="text-sm text-slate-600">Order <b className="font-mono">{data.orderNumber}</b> · {data.method}</p>
          <CopyField label="Amount due" value={amount} />
          {data.fields.map((f, i) => <CopyField key={i} label={f.label} value={f.value} />)}
          <CopyField label="Payment reference" value={data.orderNumber} />
          <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
            {paymentTermsLines(amount, data.orderNumber).map((t: string) => <li key={t}>{t}</li>)}
          </ul>
        </>
      )}
    </div>
  );
};
