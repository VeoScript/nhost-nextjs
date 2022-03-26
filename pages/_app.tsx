import '../styles/tailwind.css'
import type { AppProps } from 'next/app'

import { NhostSSR } from '@nhost/client'
import { NhostProvider } from '@nhost/react'
import { NhostApolloProvider } from '@nhost/react-apollo'

const nhost = new NhostSSR({ backendUrl: `${process.env.BACKEND_URL}` })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NhostProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider graphqlUrl={process.env.GRAPHQL_URL} >
        <Component {...pageProps} />
      </NhostApolloProvider>
    </NhostProvider>
  )
}

export default MyApp
