// Base chain minimal config for wagmi / RainbowKit. Replace RPC if you have a paid provider.
export const baseChain = {
  id: 8453,
  name: 'Base',
  network: 'base',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: 'https://developer-access-mainnet.base.org'
  },
  blockExplorers: {
    default: { name: 'BaseScan', url: 'https://basescan.org' }
  },
  testnet: false
}
