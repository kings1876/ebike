# Auth.md

E Bikes for Sale is a public online store. No authentication is required to read any page or file listed here.

## Agent registration

None. Agents may read public pages without an account. Orders are placed by a person through the website checkout, and payment details are sent to the customer by email after the order is received.

## Public resources

| Resource | URL |
|---|---|
| Shop | https://ebikesale.com.au/shop |
| Blog and buying guides | https://ebikesale.com.au/blog |
| FAQ | https://ebikesale.com.au/faq |
| Contact | https://ebikesale.com.au/contact |
| llms.txt | https://ebikesale.com.au/llms.txt |
| API catalog | https://ebikesale.com.au/.well-known/api-catalog |
| Agent skills | https://ebikesale.com.au/.well-known/agent-skills/index.json |
| MCP server card | https://ebikesale.com.au/.well-known/mcp/server-card.json |

```json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All content is public. Ordering is completed by a human."
  }
}
```

## Ordering

A human completes every order at https://ebikesale.com.au/checkout. Agents must not submit orders or payments on a person's behalf.
