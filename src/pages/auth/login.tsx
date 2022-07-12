import { CustomTextField } from '../../ui/customTextField'
import { LoadingButton as Button } from '@mui/lab'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { trpc } from '../../utils/trpc'

interface Credentials {
  username: string
  password: string
}

export default function Login() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  })
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const auth = trpc.useMutation(['auth.login'], {
    onSuccess() {
      router.push('/')
    },
  })
  const isAuth = trpc.useQuery(['auth.get'])

  const loginhandler = async () => {
    if (credentials.username !== '' && credentials.password !== '') {
      auth.mutateAsync({
        username: credentials.username,
        password: credentials.password,
      })
      setCredentials({ username: '', password: '' })
      if (!auth.data?.credentials) {
        setError('Invalid credentials')
      }
    }
  }

  if (isAuth.data?.isAuthenticated) {
    router.push('/')
  }

  return (
    <div className='flex flex-col items-center justify-center gap-1 min-h-screen dark:bg-slate-800 dark:text-gray-300'>
      <form className='flex flex-col w-2/4 md:w-4/5 gap-3'>
        <CustomTextField
          id='11'
          variant='filled'
          label='Username'
          error={!!error}
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <CustomTextField
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
        <Button
          sx={{
            color: 'inherit',
          }}
          loading={auth.isLoading}
          onClick={loginhandler}
        >
          Log in
        </Button>
      </form>
      <Button
        sx={{
          color: 'inherit',
        }}
        onClick={() => router.push('/auth/register')}
      >
        Dont have an existing account?
      </Button>
    </div>
  )
}
