/**
 * Tells IndexNow search engines (Bing, Yandex, Seznam, Naver and others) about new or changed URLs.
 * Usage: npx tsx scripts/indexnow.ts            submit every URL in the live sitemap
 *        npx tsx scripts/indexnow.ts /blog/a /b  submit only these paths
 * The key file public/<key>.txt must be deployed first: it proves the site owner sent the request.
 */
import fs from 'node:fs';

const HOST = 'ebikesale.com.au';
const KEY = fs.readdirSync('public').find((f) => /^[0-9a-f]{32}\.txt$/.test(f))?.replace('.txt', '');
if (!KEY) throw new Error('No IndexNow key file (public/<32 hex>.txt) found');

const args = process.argv.slice(2);
let urls: string[];
if (args.length) {
  urls = args.map((p) => `https://${HOST}${p.startsWith('/') ? p : '/' + p}`);
} else {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: submitted ${urls.length} URLs, HTTP ${res.status} ${res.statusText}`);
if (res.status >= 300) console.log(await res.text());
