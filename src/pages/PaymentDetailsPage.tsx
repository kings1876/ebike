import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, Copy } from 'lucide-react';
import { paymentTermsLines } from '../../shared/payment.js';

interface Details { orderNumber: string; amountDue: number; method: string; fields: { label: string; value: string }[]; txReported?: boolean }

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

const WalletQr: React.FC<{ value: string }> = ({ value }) => {
  const [src, setSrc] = useState('');
  useEffect(() => {
    let on = true;
    import('qrcode').then((q) => q.toDataURL(value, { margin: 1, width: 220 })).then((u) => on && setSrc(u)).catch(() => {});
    return () => { on = false; };
  }, [value]);
  return src ? <img src={src} width={220} height={220} alt="QR code of the wallet address" className="mx-auto rounded-lg border border-slate-200" /> : <div className="h-[220px]" />;
};

const AfterYouSend: React.FC<{ id: string; reported: boolean }> = ({ id, reported }) => {
  const [tx, setTx] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done'>(reported ? 'done' : 'idle');
  const [error, setError] = useState('');
  const send = async () => {
    setState('sending'); setError('');
    try {
      const r = await fetch('/api/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, txHash: tx.trim() }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || 'Could not send');
      setState('done');
    } catch (e) { setError((e as Error).message); setState('idle'); }
  };
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
      <h2 className="text-xl font-extrabold text-slate-900">After you send</h2>
      {state === 'done' ? (
        <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg p-3">Thank you. We have your transaction ID and will confirm your payment shortly. We dispatch your e-bike once the transaction is verified.</p>
      ) : (
        <>
          <label htmlFor="tx" className="block text-sm font-semibold text-slate-800">Transaction ID (hash)</label>
          <input id="tx" value={tx} onChange={(e) => setTx(e.target.value)} placeholder="Paste the transaction ID from your wallet" autoComplete="off" spellCheck={false}
            className="w-full px-3 py-3 border border-slate-300 rounded-lg text-sm font-mono bg-slate-50" />
          {error && <p className="text-xs text-red-700" role="alert">{error}</p>}
          <button type="button" disabled={state === 'sending' || tx.trim().length < 8} onClick={send}
            className="w-full py-3.5 rounded-lg bg-amber-500 text-slate-950 font-extrabold text-sm uppercase tracking-wide disabled:opacity-60 cursor-pointer">
            {state === 'sending' ? 'Sending…' : "I've paid: send transaction ID"}
          </button>
        </>
      )}
      <p className="text-sm text-slate-600">Your order is dispatched once the transaction is verified. Questions? Email <a className="text-emerald-800 underline" href="mailto:sales@ebikesale.com.au">sales@ebikesale.com.au</a> and quote {id}.</p>
      <Link to="/" className="inline-block px-5 py-3 rounded-lg bg-slate-900 text-white text-sm font-bold">Return to Store</Link>
    </div>
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
          {data.fields.some((f) => f.label === 'Wallet Address') && (
            <div className="text-center space-y-2">
              <WalletQr value={data.fields.find((f) => f.label === 'Wallet Address')!.value} />
              <p className="text-xs text-slate-600">Scan to copy the wallet address. Send only on the network shown above, or the funds may be lost.</p>
            </div>
          )}
          <CopyField label="Payment reference" value={data.orderNumber} />
          <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
            {paymentTermsLines(amount, data.orderNumber).map((t: string) => <li key={t}>{t}</li>)}
          </ul>
          {data.method === 'Crypto' && <AfterYouSend id={data.orderNumber} reported={Boolean(data.txReported)} />}
        </>
      )}
    </div>
  );
};
