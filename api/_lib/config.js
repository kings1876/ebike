// Single source of brand / contact specifics for the reply portal and emails.
export const SITE = {
  name: 'E Bikes for Sale',
  domain: 'ebikesale.com.au',
  salesEmail: 'sales@ebikesale.com.au',
  currency: 'AUD',
  brand: { primary: '#059669', headerDark: '#0f172a' },
};

export const origin = () => `https://${SITE.domain}`;

export const orderInbox = () => process.env.ORDER_EMAIL || SITE.salesEmail;
export const contactInbox = () => process.env.CONTACT_EMAIL || SITE.salesEmail;
