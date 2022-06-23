import { PasswordInput, Button, TextInput } from '@mantine/core'
import { useState } from 'react'
import { onAuth } from '../../lib/onAuth'
import { useStore } from '../../store/userstore'
import { useRouter } from 'next/router'

interface Credentials {
  username: string
  password: string
  password2: string
}

export default function register() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
    password2: '',
  })
  const { register } = onAuth()
  const isLoggedIn = useStore((state) => state.isLoggedIn)
  const router = useRouter()

  const registerHandler = () => {
    if (credentials.username.length > 3 && credentials.password.length > 5) {
      register(credentials)
      setCredentials({
        username: '',
        password: '',
        password2: '',
      })
    }
  }

  if (isLoggedIn) {
    router.push('/')
  }

  return (
    <div className='flex flex-col min-h-screen items-center justify-center gap-1'>
      <form className='flex flex-col w-2/4 gap-3'>
        <TextInput
          placeholder='Your username'
          error=''
          label='Enter your username'
          required
          id='16'
          onChange={(e: any) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <PasswordInput
          placeholder='Password'
          required
          label='Password'
          id='17'
          onChange={(e: any) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <PasswordInput
          placeholder='Password'
          label='Confirm password'
          required
          id='15'
        />
      </form>
      <Button
        variant='subtle'
        color='gray'
        radius='xs'
        size='md'
        uppercase
        onClick={registerHandler}
      >
        Register
      </Button>
      <Button variant='subtle' color='teal' radius='xs' size='xs' compact>
        have an existing account?
      </Button>
    </div>
  )
}
