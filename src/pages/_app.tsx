import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function MyApp({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  const { isAuthenticated } = useAuth()

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
