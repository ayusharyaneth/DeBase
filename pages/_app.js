import '../styles/globals.css'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { baseChain } from '../utils/chains'

const { chains, provider } = configureChains(
  [baseChain],
  [
    jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) }),
    publicProvider()
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'DeBaseApp',
  chains
})

const client = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function MyApp ({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
