import { timingSafeEqual } from 'node:crypto';

// Returns null when authorised, otherwise { status, error } to send back.
export function checkAdminPasscode(req) {
  const expected = process.env.ADMIN_PASSCODE;
  if (!expected) return { status: 503, error: 'ADMIN_PASSCODE is not configured' };
  const given = String(req.headers['x-admin-passcode'] || '');
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return { status: 401, error: 'Wrong passcode' };
  return null;
}
