import { PasswordInput, Button, TextInput } from '@mantine/core'
import { useState } from 'react'
import { onAuth } from '../../lib/onAuth'
import { useRouter } from 'next/router'
import { useStore } from '../../store/userstore'

interface Credentials {
  username: string
  password: string
}

export default function login() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  })
  const { login } = onAuth()
  const isLoggedIn = useStore((state) => state.isLoggedIn)
  const router = useRouter()

  const loginhandler = () => {
    if ((credentials.username !== '', credentials.password !== '')) {
      login(credentials)
      setCredentials({ username: '', password: '' })
    }
  }

  if (isLoggedIn) {
    router.push('/')
  }

  return (
    <div className='flex flex-col items-center justify-center gap-1 min-h-screen'>
      <form className='flex flex-col w-2/4 gap-3'>
        <TextInput
          id='11'
          placeholder='Your email'
          error=''
          label='Enter your email'
          required
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <PasswordInput
          placeholder='Password'
          required
          label='Password'
          id='12'
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
      </form>
      <Button
        variant='subtle'
        color='gray'
        radius='xs'
        size='md'
        uppercase
        onClick={loginhandler}
      >
        Log in
      </Button>
      <Button
        variant='subtle'
        color='teal'
        radius='xs'
        size='xs'
        compact
        onClick={() => router.push('/auth/register')}
      >
        Dont have an existing account?
      </Button>
    </div>
  )
}
