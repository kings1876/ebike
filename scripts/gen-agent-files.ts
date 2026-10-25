/**
 * Writes the agent-discoverable declaration files (WebForge sections A-N) from one config.
 * The domain comes from SITE.domain in api/_lib/config.js. Nothing here claims a capability the
 * site lacks: ordering is human-completed through the website checkout, there is no auth, and
 * the MCP server card declares transport "none".
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { SITE } from '../api/_lib/config.js';
import { CATEGORY_SEO, COLLECTIONS } from '../src/data/seo';

const D = `https://${SITE.domain}`;
const NAME = SITE.name;
const DESC = `${NAME} is an Australian online electric bike retailer selling electric mountain, commuter, step-through, folding, cargo and fat tyre e-bikes, trikes, scooters, batteries and accessories, with free delivery across Australia and a 2-year warranty.`;
const PAY = ['bank-transfer', 'osko-payid', 'crypto'];
const sha = (s: string) => crypto.createHash('sha256').update(s).digest('hex');
const write = (rel: string, body: string | object) => {
  const file = path.join('public', rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, typeof body === 'string' ? body : JSON.stringify(body, null, 2) + '\n');
};

// A. robots.txt (AI crawlers explicitly welcome, private paths disallowed)
const bots = ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Applebot', 'Amazonbot', 'Bytespider', 'CCBot', 'Google-Extended', 'Meta-ExternalAgent', 'cohere-ai'];
write('robots.txt', [
  'User-agent: *', 'Allow: /', 'Disallow: /admin/', 'Disallow: /api/', 'Disallow: /order/', '',
  '# AI crawlers: welcome to read product and content pages',
  ...bots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', 'Disallow: /admin/', 'Disallow: /api/', 'Disallow: /order/', '']),
  '# Agent-readable resources',
  `# llms.txt: ${D}/llms.txt`,
  `# API Catalog: ${D}/.well-known/api-catalog`,
  `# Agent Skills: ${D}/.well-known/agent-skills/index.json`,
  `# MCP Server Card: ${D}/.well-known/mcp/server-card.json`, '',
  `Sitemap: ${D}/sitemap.xml`, '',
].join('\n'));

// C. auth.md
write('auth.md', `# Auth.md

${NAME} is a public online store. No authentication is required to read any page or file listed here.

## Agent registration

None. Agents may read public pages without an account. Orders are placed by a person through the website checkout, and payment details are sent to the customer by email after the order is received.

## Public resources

| Resource | URL |
|---|---|
| Shop | ${D}/shop |
| Blog and buying guides | ${D}/blog |
| FAQ | ${D}/faq |
| Contact | ${D}/contact |
| llms.txt | ${D}/llms.txt |
| API catalog | ${D}/.well-known/api-catalog |
| Agent skills | ${D}/.well-known/agent-skills/index.json |
| MCP server card | ${D}/.well-known/mcp/server-card.json |

\`\`\`json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All content is public. Ordering is completed by a human."
  }
}
\`\`\`

## Ordering

A human completes every order at ${D}/checkout. Agents must not submit orders or payments on a person's behalf.
`);

// D. api-catalog (RFC 9727 linkset)
write('.well-known/api-catalog', {
  linkset: [
    { anchor: `${D}/`, 'https://www.iana.org/assignments/link-relations/service-doc': [{ href: `${D}/faq` }], title: `${NAME}: electric bikes Australia` },
    { anchor: `${D}/shop`, type: 'text/html', title: `${NAME} product catalogue` },
    { anchor: `${D}/blog`, type: 'text/html', title: `${NAME} buying guides` },
    { anchor: `${D}/sitemap.xml`, type: 'application/xml', title: 'XML sitemap' },
  ],
});

// E. agent skills
const skill = (name: string, type: string, description: string, url: string) => ({ name, type, description, url, sha256: sha(`${name}|${description}|${url}`) });
write('.well-known/agent-skills/index.json', {
  $schema: 'https://agentskills.io/schema/v0.2.0/index.json',
  name: NAME,
  url: D,
  description: DESC,
  skills: [
    skill('browse-products', 'navigation', 'Browse the full electric bike catalogue by category', `${D}/shop`),
    ...Object.values(CATEGORY_SEO).slice(0, 6).map((c) => skill(`browse-${c.slug}`, 'navigation', c.metaDescription, `${D}/shop/${c.slug}`)),
    ...COLLECTIONS.slice(0, 3).map((c) => skill(`browse-${c.slug}`, 'navigation', c.metaDescription, `${D}/shop/${c.slug}`)),
    skill('buying-guides', 'content', 'E-bike buying guides, laws and maintenance articles', `${D}/blog`),
    skill('contact', 'support', 'Ask a question about sizing, orders, delivery or warranty', `${D}/contact`),
  ],
});

// F. MCP server card: no live server, so transport is "none"
write('.well-known/mcp/server-card.json', {
  $schema: 'https://modelcontextprotocol.io/schemas/server-card/v1.json',
  serverInfo: { name: NAME, version: '1.0.0', description: DESC, homepage: D, contact: { email: SITE.salesEmail } },
  transport: { type: 'none', note: 'human_ordering_only: this site has no MCP server. Read the public pages or llms.txt.' },
  capabilities: {
    resources: [
      { name: 'product-catalog', description: 'Full product catalogue', uri: `${D}/shop` },
      { name: 'blog', description: 'Buying guides and e-bike law explainers', uri: `${D}/blog` },
      { name: 'llms-txt', description: 'Site summary for language models', uri: `${D}/llms.txt` },
    ],
    commerce: { ordering: 'website checkout, completed by a person', payment: PAY, currency: SITE.currency, freeShipping: 'Free delivery across Australia', ships: 'Australia' },
  },
  legal: { ageRestriction: 'none', productType: 'electric bicycles, e-trikes, e-scooters and accessories', compliance: 'Pedal-assist bikes are built to EN 15194 (250W, 25 km/h assistance). Rules differ by state.' },
});

// G, H, I. OAuth / OIDC discovery stubs (public site, no auth)
write('.well-known/oauth-protected-resource', {
  resource: D, resource_name: `${NAME} public catalogue`, authorization_servers: [], scopes_supported: [], bearer_methods_supported: [],
  resource_documentation: `${D}/auth.md`, resource_policy_uri: `${D}/terms`, tls_client_certificate_bound_access_tokens: false,
  note: `All resources on ${SITE.domain} are public. No OAuth tokens are required.`,
});
write('.well-known/oauth-authorization-server', {
  issuer: D, authorization_endpoint: null, token_endpoint: null, jwks_uri: null, grant_types_supported: [], response_types_supported: [], scopes_supported: [],
  note: `${NAME} has no protected APIs. All resources are public.`,
  public_resources: [`${D}/shop`, `${D}/blog`, `${D}/faq`, `${D}/llms.txt`, `${D}/.well-known/api-catalog`, `${D}/.well-known/agent-skills/index.json`, `${D}/.well-known/mcp/server-card.json`],
  agent_auth: { register_uri: null, identity_types_supported: ['none'], credential_types_supported: ['none'], notes: 'No registration required. All content is public.' },
});
write('.well-known/openid-configuration', {
  issuer: D, note: `${NAME} does not operate an OpenID Connect provider.`, public_site: true,
  authorization_endpoint: null, token_endpoint: null, userinfo_endpoint: null, jwks_uri: null,
  scopes_supported: [], response_types_supported: [], grant_types_supported: [], subject_types_supported: [], id_token_signing_alg_values_supported: [],
});

// J, K. commerce discovery (human-assisted ordering only)
write('.well-known/acp.json', {
  protocol: { name: 'acp', version: '0.1.0' }, name: NAME, description: DESC, api_base_url: D, homepage: D, transports: ['https'],
  capabilities: { services: ['product-catalog', 'blog', 'faq'], ordering: 'human-assisted-website-checkout', payment_methods: PAY, currency: SITE.currency },
  contact: { email: SITE.salesEmail },
  legal: { age_restriction: 'none', region: 'AU', ships_to: 'Australia', product_type: 'electric bicycles and accessories', compliance: 'EN 15194 pedal-assist standard; state rules apply' },
});
write('.well-known/ucp', {
  ucp: '1.0', protocol_version: '1.0', spec: 'https://ucp.dev/specification/overview/', schema: 'https://ucp.dev/schema/v1.json',
  site: D, name: NAME, description: DESC,
  services: [
    { id: 'product-catalog', type: 'catalog', url: `${D}/shop`, description: 'Full product catalogue' },
    { id: 'order', type: 'commerce', url: `${D}/checkout`, description: 'Order checkout, completed by a person' },
  ],
  capabilities: ['browse', 'inquiry', 'content'],
  endpoints: { catalog: `${D}/shop`, contact: `${D}/contact`, agent_skills: `${D}/.well-known/agent-skills/index.json`, mcp_server_card: `${D}/.well-known/mcp/server-card.json`, api_catalog: `${D}/.well-known/api-catalog`, llms_txt: `${D}/llms.txt` },
  currency: SITE.currency, payment_methods: PAY,
  legal: { age_restriction: 'none', product_type: 'electric bicycles and accessories', compliance: 'EN 15194 pedal-assist standard; state rules apply' },
});

// L. WebMCP: navigation tools only, no state changes
write('js/webmcp.js', `(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  var go = function (path) { return async function () { window.location.href = '${D}' + path; return { url: '${D}' + path }; }; };
  navigator.modelContext.provideContext({
    tools: [
      { name: 'browse_products', description: 'Open the electric bike catalogue, optionally for one category slug', inputSchema: { type: 'object', properties: { category: { type: 'string', description: 'Category slug such as electric-mountain-bikes' } } },
        execute: async function (a) { var p = a && a.category ? '/shop/' + encodeURIComponent(a.category) : '/shop'; window.location.href = '${D}' + p; return { url: '${D}' + p }; } },
      { name: 'read_buying_guides', description: 'Open the buying guides', inputSchema: { type: 'object', properties: {} }, execute: go('/blog') },
      { name: 'contact', description: 'Open the contact page for product questions or support', inputSchema: { type: 'object', properties: {} }, execute: go('/contact') }
    ]
  });
})();
`);

console.log('agent files written');
