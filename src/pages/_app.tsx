import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { useEffect } from 'react'
import { onAuth } from '../lib/onAuth'

export default function MyApp({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  const { isAuthenticated } = onAuth()

  useEffect(() => {
    return () => {
      isAuthenticated()
    }
  }, [])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
