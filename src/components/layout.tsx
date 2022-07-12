import Navbar from './navbar'
import React from 'react'

export default function Layout({ children }: any) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}
