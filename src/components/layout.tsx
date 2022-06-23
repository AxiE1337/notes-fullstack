import Navbar from './navbar'
import React from 'react'
import { useStore } from '../store/userstore'

export default function Layout({ children }: any) {
  const isLoggedIn = useStore((state) => state.isLoggedIn)
  const user = useStore((state) => state.user)
  return (
    <main>
      <Navbar isLoggedIn={isLoggedIn} user={user} />
      {children}
    </main>
  )
}
