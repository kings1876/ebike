import React, { createContext, useContext, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const KEY = 'ebk_admin_passcode';
const PrimaryCtx = createContext<{ api: <T = any>(qs: string, init?: RequestInit) => Promise<T> }>({ api: async () => ({}) as any });
export const useAdminApi = () => useContext(PrimaryCtx).api;

export const AdminShell: React.FC = () => {
  const [passcode, setPasscode] = useState(() => {
    try { return sessionStorage.getItem(KEY) || ''; } catch { return ''; }
  });
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex, nofollow';
    document.head.appendChild(m);
    return () => { m.remove(); };
  }, []);

  const api = async <T,>(qs: string, init: RequestInit = {}): Promise<T> => {
    const res = await fetch(`/api/admin?${qs}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', 'X-Admin-Passcode': passcode, ...(init.headers || {}) },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
    return data as T;
  };

  useEffect(() => {
    if (!passcode) return;
    api('r=orders').then(() => setOk(true)).catch((e) => { setError(e.message); setOk(false); });
  }, [passcode]);

  const signIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try { sessionStorage.setItem(KEY, input); } catch { /* ignore */ }
    setPasscode(input);
  };
  const signOut = () => {
    try { sessionStorage.removeItem(KEY); } catch { /* ignore */ }
    setPasscode(''); setOk(false); setInput('');
  };

  if (!ok) {
    return (
      <div className="max-w-sm mx-auto px-4 py-20">
        <form onSubmit={signIn} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <h1 className="text-lg font-bold text-slate-900">Reply Portal</h1>
          <label className="block text-xs font-medium text-slate-700" htmlFor="pc">Admin passcode</label>
          <input id="pc" type="password" autoFocus value={input} onChange={(e) => setInput(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg cursor-pointer">Sign in</button>
        </form>
      </div>
    );
  }

  const tab = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg text-sm font-semibold ${isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`;

  return (
    <PrimaryCtx.Provider value={{ api }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <NavLink to="/admin" end className={tab}>Dashboard</NavLink>
          <NavLink to="/admin/orders" className={tab}>Orders</NavLink>
          <NavLink to="/admin/enquiries" className={tab}>Enquiries</NavLink>
          <button onClick={signOut} className="ml-auto text-xs text-slate-500 hover:text-slate-900 cursor-pointer">Sign out</button>
        </div>
        <Outlet />
      </div>
    </PrimaryCtx.Provider>
  );
};
