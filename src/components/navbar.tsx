import React from 'react'
import { Button } from '@mantine/core'
import { useRouter } from 'next/router'

interface Props {
  isLoggedIn: boolean
  user: {
    username: string
  }
}

export default function Navbar({ isLoggedIn, user }: Props) {
  const router = useRouter()

  return (
    <div className='flex items-center justify-between w-sceen h-10 bg-gradient-to-r from-indigo-300'>
      <Button
        variant='subtle'
        color='dark'
        radius='xs'
        compact
        uppercase
        className='ml-3'
        onClick={() => router.push('/')}
      >
        Notes
      </Button>
      {!!user.username && (
        <div className='flex mr-4'>
          <h1 className='mr-4 select-none'>{user.username}</h1>

          {!isLoggedIn && (
            <Button
              variant='subtle'
              color='dark'
              radius='xs'
              compact
              uppercase
              onClick={() => router.push('/auth/login')}
            >
              Log in
            </Button>
          )}
          {isLoggedIn && (
            <Button variant='subtle' color='dark' radius='xs' compact uppercase>
              Log out
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
