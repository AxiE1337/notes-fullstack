import { TextField } from '@mui/material'
import { LoadingButton as Button } from '@mui/lab'
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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const loginhandler = async () => {
    if (credentials.username !== '' && credentials.password !== '') {
      setIsLoading(true)
      const isSuccessful = await login(credentials)
      setCredentials({ username: '', password: '' })
      setIsLoading(false)
      if (isSuccessful === undefined) {
        setError('Invalid credentials')
      }
    }
  }

  if (isLoggedIn) {
    router.push('/')
  }

  return (
    <div className='flex flex-col items-center justify-center gap-1 min-h-screen'>
      <form className='flex flex-col w-2/4 md:w-4/5 gap-3'>
        <TextField
          id='11'
          variant='filled'
          label='Username'
          error={!!error}
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <TextField
          label='Password'
          id='12'
          variant='filled'
          type='password'
          error={!!error}
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <p className='text-center text-red-600'>{error}</p>
        <Button loading={isLoading} onClick={loginhandler}>
          Log in
        </Button>
      </form>
      <Button onClick={() => router.push('/auth/register')}>
        Dont have an existing account?
      </Button>
    </div>
  )
}
