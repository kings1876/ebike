// Receiving wallets for crypto orders. Used by the checkout (coin picker), the order API (auto payment details) and the admin presets.
export const WALLETS = [
  { id: 'USDT', label: 'USDT (Tron)', coin: 'USDT (Tether)', network: 'Tron (TRC-20)', address: 'TBnrAF6yjaYyUBXFGDzDUdkUG7EZr6qrFN' },
  { id: 'BTC', label: 'Bitcoin (BTC)', coin: 'Bitcoin (BTC)', network: 'Bitcoin', address: 'bc1qzn330nvevy8l2phf2swc25znd8ct6ju9gdprl7' },
  { id: 'ETH', label: 'Ethereum (ETH)', coin: 'Ethereum (ETH)', network: 'Ethereum (ERC-20)', address: '0x71e590e953d8DBf7a2d8a4Fa58Ea55c3c57A6f8C' },
];

export const walletById = (id) => WALLETS.find((w) => w.id === id);

export const walletDetail = (w) => `Coin: ${w.coin}\nNetwork: ${w.network}\nWallet Address: ${w.address}`;
