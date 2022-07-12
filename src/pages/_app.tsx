import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { withTRPC } from '@trpc/next'
import { AppRouter } from '../server/router'

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc'

    return {
      url,
    }
  },
  ssr: false,
})(MyApp)
