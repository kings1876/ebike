(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  var go = function (path) { return async function () { window.location.href = 'https://ebikesale.com.au' + path; return { url: 'https://ebikesale.com.au' + path }; }; };
  navigator.modelContext.provideContext({
    tools: [
      { name: 'browse_products', description: 'Open the electric bike catalogue, optionally for one category slug', inputSchema: { type: 'object', properties: { category: { type: 'string', description: 'Category slug such as electric-mountain-bikes' } } },
        execute: async function (a) { var p = a && a.category ? '/shop/' + encodeURIComponent(a.category) : '/shop'; window.location.href = 'https://ebikesale.com.au' + p; return { url: 'https://ebikesale.com.au' + p }; } },
      { name: 'read_buying_guides', description: 'Open the buying guides', inputSchema: { type: 'object', properties: {} }, execute: go('/blog') },
      { name: 'contact', description: 'Open the contact page for product questions or support', inputSchema: { type: 'object', properties: {} }, execute: go('/contact') }
    ]
  });
})();
