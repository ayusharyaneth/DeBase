// Basic Base chain config (Mainnet). For testing, add Sepolia Sepolia-like chain as needed.
// Replace rpc URL if you use a specific provider like Alchemy/QuickNode.
export const baseChain = {
  id: 8453,
  name: 'Base',
  network: 'base',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: 'https://developer-access-mainnet.base.org' // public Base RPC (replace if you use provider)
  },
  blockExplorers: {
    default: { name: 'BaseScan', url: 'https://basescan.org' }
  },
  testnet: false
}
