import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAdminApi } from './AdminShell';
import { WALLETS, walletDetail } from '../../../shared/wallets.js';
import { parsePaymentDetail, PAYMENT_METHODS, paymentTermsLines } from '../../../shared/payment.js';

interface Order {
  orderNumber: string; customerName: string; customerEmail: string; customerPhone: string; address: string;
  paymentMethod: string; notes: string; amountDue: number; status: string; txHash?: string; createdAt: string;
  items: { name: string; variant?: string; quantity: number; price: number }[];
  paymentDetails?: { method: string; detail: string; sentAt: string };
}
interface Enquiry {
  id: string; type: string; name: string; email: string; phone?: string; topic?: string; message: string;
  status: string; createdAt: string; repliedAt?: string;
}

const money = (n: number) => `$${n.toLocaleString('en-AU', { minimumFractionDigits: 2 })} AUD`;
const when = (iso: string) => new Date(iso).toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short' });
const card = 'bg-white border border-slate-200 rounded-2xl p-5 shadow-xs';
const btn = 'px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white text-sm font-bold rounded-lg cursor-pointer';

const Badge: React.FC<{ s: string }> = ({ s }) => {
  const tone = s === 'payment-confirmed' || s === 'replied' ? 'bg-emerald-100 text-emerald-800'
    : s === 'payment-reported' ? 'bg-violet-100 text-violet-800'
    : s === 'payment-sent' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800';
  return <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${tone}`}>{s}</span>;
};

function useList<T>(r: 'orders' | 'enquiries') {
  const api = useAdminApi();
  const [rows, setRows] = useState<T[] | null>(null);
  const [store, setStore] = useState(true);
  const [error, setError] = useState('');
  const load = () => api<{ store: boolean; rows: T[] }>(`r=${r}`).then((d) => { setRows(d.rows); setStore(d.store); }).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);
  return { rows, store, error, reload: load };
}

const StoreWarning: React.FC = () => (
  <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
    Storage is not connected yet (Upstash Redis). Orders and enquiries are still emailed to the shop inbox but will not appear here.
  </div>
);

export const AdminDashboard: React.FC = () => {
  const o = useList<Order>('orders');
  const q = useList<Enquiry>('enquiries');
  const pending = o.rows?.filter((x) => x.status === 'pending').length ?? 0;
  const fresh = q.rows?.filter((x) => x.status === 'new').length ?? 0;
  return (
    <div className="space-y-6">
      {!o.store && <StoreWarning />}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/admin/orders" className={card}>
          <div className="text-xs text-slate-500">Orders</div>
          <div className="text-3xl font-extrabold text-slate-900">{o.rows?.length ?? '…'}</div>
          <div className="text-xs text-amber-700 font-semibold">{pending} awaiting payment details</div>
        </Link>
        <Link to="/admin/enquiries" className={card}>
          <div className="text-xs text-slate-500">Enquiries</div>
          <div className="text-3xl font-extrabold text-slate-900">{q.rows?.length ?? '…'}</div>
          <div className="text-xs text-amber-700 font-semibold">{fresh} unanswered</div>
        </Link>
      </div>
      <div className={card}>
        <h2 className="font-bold text-slate-900 mb-3 text-sm">Recent orders</h2>
        {(o.rows ?? []).slice(0, 5).map((x) => (
          <Link key={x.orderNumber} to={`/admin/orders/${x.orderNumber}`} className="flex justify-between py-2 border-b border-slate-100 text-sm">
            <span><b className="font-mono">{x.orderNumber}</b> · {x.customerName}</span><Badge s={x.status} />
          </Link>
        ))}
        {o.rows?.length === 0 && <p className="text-xs text-slate-500">No orders yet.</p>}
      </div>
    </div>
  );
};

export const AdminOrders: React.FC = () => {
  const { rows, store, error } = useList<Order>('orders');
  return (
    <div>
      {!store && <StoreWarning />}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="space-y-2">
        {(rows ?? []).map((x) => (
          <Link key={x.orderNumber} to={`/admin/orders/${x.orderNumber}`} className={`${card} flex flex-wrap items-center justify-between gap-2`}>
            <div>
              <div className="font-mono font-bold text-slate-900">{x.orderNumber}</div>
              <div className="text-xs text-slate-500">{x.customerName} · {when(x.createdAt)}</div>
            </div>
            <div className="flex items-center gap-3"><span className="font-mono text-sm font-semibold">{money(x.amountDue)}</span><Badge s={x.status} /></div>
          </Link>
        ))}
        {rows?.length === 0 && <p className="text-sm text-slate-500">No orders yet.</p>}
      </div>
    </div>
  );
};

export const AdminOrderDetail: React.FC = () => {
  const { id = '' } = useParams();
  const api = useAdminApi();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [method, setMethod] = useState(PAYMENT_METHODS[0]);
  const [detail, setDetail] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const load = () => api<Order>(`r=orders&id=${id}`).then((o) => {
    setOrder(o);
    if (o.paymentDetails) { setMethod(o.paymentDetails.method); setDetail(o.paymentDetails.detail); }
    else setMethod(PAYMENT_METHODS.find((m) => o.paymentMethod.toLowerCase().startsWith(m.split(' ')[0].toLowerCase())) || PAYMENT_METHODS[0]);
  }).catch((e) => setMsg(e.message));
  useEffect(() => { load(); }, [id]);

  if (!order) return <p className="text-sm text-slate-500">{msg || 'Loading…'}</p>;
  const fields = parsePaymentDetail(detail);

  const send = async () => {
    setBusy(true); setMsg('');
    try {
      await api('r=send-payment', { method: 'POST', body: JSON.stringify({ orderNumber: order.orderNumber, method, detail }) });
      setMsg('Payment details emailed to the customer.');
      load();
    } catch (e: any) { setMsg(e.message); } finally { setBusy(false); }
  };
  const remove = async () => {
    if (!confirm(`Delete order ${order.orderNumber}?`)) return;
    await api(`r=orders&id=${order.orderNumber}`, { method: 'DELETE' });
    navigate('/admin/orders');
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className={`${card} space-y-2 text-sm`}>
        <div className="flex justify-between items-center"><h1 className="font-mono font-bold text-lg">{order.orderNumber}</h1><Badge s={order.status} /></div>
        <p><b>{order.customerName}</b><br />{order.customerEmail} · {order.customerPhone}</p>
        <p className="text-slate-600">{order.address}</p>
        <p className="text-xs text-slate-500">Chosen method: {order.paymentMethod} · {when(order.createdAt)}</p>
        <ul className="border-t border-slate-100 pt-2">
          {order.items.map((i, n) => <li key={n}>{i.quantity} × {i.name}{i.variant ? ` (${i.variant})` : ''} — {money(i.price * i.quantity)}</li>)}
        </ul>
        <p className="font-bold">Amount due: {money(order.amountDue)}</p>
        {order.txHash && <p className="text-xs"><b>Customer transaction ID:</b> <span className="font-mono break-all">{order.txHash}</span></p>}
        {order.notes && <p className="text-xs text-slate-600">Notes: {order.notes}</p>}
        <button onClick={remove} className="text-xs text-red-600 cursor-pointer">Delete order</button>
      </div>

      <div className={`${card} space-y-3`}>
        <h2 className="font-bold text-sm">{order.paymentDetails ? 'Resend payment details' : 'Send payment details'}</h2>
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
          {PAYMENT_METHODS.map((m: string) => <option key={m}>{m}</option>)}
        </select>
        {method === 'Crypto' && (
          <div className="flex flex-wrap gap-2">
            {WALLETS.map((w: (typeof WALLETS)[number]) => (
              <button key={w.label} type="button" onClick={() => setDetail(walletDetail(w))}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 cursor-pointer">Use {w.label}</button>
            ))}
          </div>
        )}
        <textarea rows={6} value={detail} onChange={(e) => setDetail(e.target.value)}
          placeholder={'Paste once, e.g.\nAccount Name: ...\nBSB: ...\nAccount Number: ...'}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono" />
        {fields.length > 0 && (
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs space-y-1">
            <div className="font-bold text-slate-700">Customer will see:</div>
            {fields.map((f: { label: string; value: string }, n: number) => <div key={n}><span className="text-slate-500">{f.label}:</span> <b>{f.value}</b></div>)}
            <ul className="list-disc pl-4 text-slate-600 pt-1">
              {paymentTermsLines(money(order.amountDue), order.orderNumber).map((t: string) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        )}
        <button onClick={send} disabled={busy || !fields.length} className={btn}>{busy ? 'Sending…' : 'Email payment details'}</button>
        {msg && <p className="text-xs text-slate-700">{msg}</p>}
      </div>
    </div>
  );
};

export const AdminEnquiries: React.FC = () => {
  const { rows, store, error } = useList<Enquiry>('enquiries');
  const [filter, setFilter] = useState('all');
  const shown = (rows ?? []).filter((x) => filter === 'all' || x.type === filter || x.status === filter);
  return (
    <div>
      {!store && <StoreWarning />}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2 mb-4 text-xs">
        {['all', 'contact', 'wholesale', 'new', 'replied'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-full border cursor-pointer ${filter === f ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-300 text-slate-600'}`}>{f}</button>
        ))}
      </div>
      <div className="space-y-2">
        {shown.map((x) => (
          <Link key={x.id} to={`/admin/enquiries/${x.id}`} className={`${card} flex flex-wrap items-center justify-between gap-2`}>
            <div>
              <div className="font-bold text-slate-900 text-sm">{x.name} <span className="font-normal text-slate-500">· {x.topic || x.type}</span></div>
              <div className="text-xs text-slate-500 line-clamp-1">{x.message}</div>
            </div>
            <Badge s={x.status} />
          </Link>
        ))}
        {rows && shown.length === 0 && <p className="text-sm text-slate-500">Nothing here.</p>}
      </div>
    </div>
  );
};

export const AdminEnquiryDetail: React.FC = () => {
  const { id = '' } = useParams();
  const api = useAdminApi();
  const navigate = useNavigate();
  const [enq, setEnq] = useState<Enquiry | null>(null);
  const [reply, setReply] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const load = () => api<Enquiry>(`r=enquiries&id=${id}`).then(setEnq).catch((e) => setMsg(e.message));
  useEffect(() => { load(); }, [id]);
  if (!enq) return <p className="text-sm text-slate-500">{msg || 'Loading…'}</p>;

  const send = async () => {
    setBusy(true); setMsg('');
    try {
      await api('r=reply', { method: 'POST', body: JSON.stringify({ id: enq.id, message: reply }) });
      setMsg('Reply sent.'); setReply(''); load();
    } catch (e: any) { setMsg(e.message); } finally { setBusy(false); }
  };
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className={`${card} space-y-2 text-sm`}>
        <div className="flex justify-between"><h1 className="font-bold">{enq.name}</h1><Badge s={enq.status} /></div>
        <p>{enq.email}{enq.phone ? ` · ${enq.phone}` : ''}</p>
        <p className="text-xs text-slate-500">{enq.topic} · {when(enq.createdAt)}</p>
        <p className="whitespace-pre-wrap border-t border-slate-100 pt-2">{enq.message}</p>
        <button onClick={async () => { if (confirm('Delete this enquiry?')) { await api(`r=enquiries&id=${enq.id}`, { method: 'DELETE' }); navigate('/admin/enquiries'); } }} className="text-xs text-red-600 cursor-pointer">Delete</button>
      </div>
      <div className={`${card} space-y-3`}>
        <h2 className="font-bold text-sm">Reply to {enq.email}</h2>
        <textarea rows={8} value={reply} onChange={(e) => setReply(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
        <button onClick={send} disabled={busy || !reply.trim()} className={btn}>{busy ? 'Sending…' : 'Send reply'}</button>
        {msg && <p className="text-xs text-slate-700">{msg}</p>}
      </div>
    </div>
  );
};
