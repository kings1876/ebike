import { Redis } from '@upstash/redis';

// Upstash credentials arrive under different prefixes depending on how the integration was added.
function creds() {
  const e = process.env;
  const url = e.UPSTASH_REDIS_REST_URL || e.KV_REST_API_URL || e.REDIS_REST_API_URL || e.STORAGE_REST_API_URL || e.STORAGE_KV_REST_API_URL;
  const token = e.UPSTASH_REDIS_REST_TOKEN || e.KV_REST_API_TOKEN || e.REDIS_REST_API_TOKEN || e.STORAGE_REST_API_TOKEN || e.STORAGE_KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

export const isStoreConfigured = () => Boolean(creds());

let client;
const redis = () => {
  if (!client) client = new Redis(creds());
  return client;
};

const ORDERS = 'ebk:orders';
const ENQUIRIES = 'ebk:enquiries';

const parse = (v) => (typeof v === 'string' ? JSON.parse(v) : v);
const newestFirst = (a, b) => (b.createdAt || '').localeCompare(a.createdAt || '');

async function list(key) {
  if (!isStoreConfigured()) return [];
  const all = (await redis().hgetall(key)) || {};
  return Object.values(all).map(parse).sort(newestFirst);
}

export const listOrders = () => list(ORDERS);
export const listEnquiries = () => list(ENQUIRIES);

export async function getOrder(id) {
  if (!isStoreConfigured()) return null;
  const v = await redis().hget(ORDERS, id);
  return v ? parse(v) : null;
}
export async function saveOrder(order) {
  if (!isStoreConfigured()) return false;
  await redis().hset(ORDERS, { [order.orderNumber]: JSON.stringify(order) });
  return true;
}
export async function deleteOrder(id) {
  if (isStoreConfigured()) await redis().hdel(ORDERS, id);
}

export async function getEnquiry(id) {
  if (!isStoreConfigured()) return null;
  const v = await redis().hget(ENQUIRIES, id);
  return v ? parse(v) : null;
}
export async function saveEnquiry(enq) {
  if (!isStoreConfigured()) return false;
  await redis().hset(ENQUIRIES, { [enq.id]: JSON.stringify(enq) });
  return true;
}
export async function deleteEnquiry(id) {
  if (isStoreConfigured()) await redis().hdel(ENQUIRIES, id);
}
