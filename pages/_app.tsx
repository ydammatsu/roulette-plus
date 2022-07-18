import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'urql'
import { GqlClient } from 'lib/gql'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={GqlClient}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
