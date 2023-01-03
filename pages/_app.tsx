import { Web3ReactProvider } from '@web3-react/core'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { connectors } from '../shared/connectors'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Web3ReactProvider connectors={connectors}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </>
  )
}
