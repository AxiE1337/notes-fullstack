import React from 'react'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { onAuth } from '../lib/onAuth'

interface Props {
  isLoggedIn: boolean
  user: {
    username: string
  }
}

export default function Navbar({ isLoggedIn, user }: Props) {
  const router = useRouter()
  const { logout } = onAuth()

  return (
    <div className='flex items-center justify-between w-sceen h-10 bg-gradient-to-r from-indigo-300'>
      <Button className='ml-3' onClick={() => router.push('/')}>
        Notes
      </Button>

      <div className='flex mr-4 items-center'>
        {isLoggedIn && <h1 className='mr-4 select-none'>{user.username}</h1>}

        {!isLoggedIn && (
          <Button onClick={() => router.push('/auth/login')}>Log in</Button>
        )}
        {isLoggedIn && <Button onClick={() => logout()}>Log out</Button>}
      </div>
    </div>
  )
}
