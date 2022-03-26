import '../styles/tailwind.css'
import type { AppProps } from 'next/app'

import { NhostClient, NhostNextProvider } from '@nhost/nextjs'
import { NhostApolloProvider } from '@nhost/react-apollo'

const nhost = new NhostClient({ backendUrl: `${process.env.BACKEND_URL}` })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider graphqlUrl={process.env.GRAPHQL_URL} >
        <Component {...pageProps} />
      </NhostApolloProvider>
    </NhostNextProvider>
  )
}

export default MyApp
