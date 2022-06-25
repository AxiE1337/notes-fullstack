import { CustomTextField } from '../../ui/customTextField'
import { LoadingButton as Button } from '@mui/lab'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useStore } from '../../store/userstore'
import { useRouter } from 'next/router'

interface Credentials {
  username: string
  password: string
  password2: string
}
interface Error {
  message: string
  passMatch: boolean
  passLength: boolean
  userLength: boolean
}

export default function Register() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
    password2: '',
  })
  const { register } = useAuth()
  const isLoggedIn = useStore((state) => state.isLoggedIn)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>({
    message: '',
    passMatch: true,
    passLength: false,
    userLength: false,
  })
  const router = useRouter()

  const registerHandler = async () => {
    const confirmed = credentials.password === credentials.password2
    if (
      credentials.username.length > 5 &&
      credentials.password.length > 5 &&
      confirmed
    ) {
      setIsLoading(true)
      await register(credentials)
      setError({
        message: '',
        passMatch: true,
        passLength: false,
        userLength: false,
      })
      setCredentials({
        username: '',
        password: '',
        password2: '',
      })
      setIsLoading(false)
    } else {
      const passMatch = !confirmed ? 'Passwords doesnt match!' : ''
      const userLength =
        credentials.username.length < 6
          ? 'Username must be at least 6 characters'
          : ''
      const passLength =
        credentials.password.length < 6
          ? 'Password must be at least 6 characters'
          : ''
      setError({
        message: `${passLength} ${userLength} ${passMatch}`,
        passLength: !!userLength,
        userLength: !!userLength,
        passMatch: !!passMatch,
      })
    }
  }

  if (isLoggedIn) {
    router.push('/')
    return <div></div>
  }

  return (
    <div className='flex flex-col min-h-screen items-center justify-center gap-1 dark:bg-slate-800 dark:text-gray-300'>
      <form className='flex flex-col w-2/4 md:w-4/5 gap-3'>
        <CustomTextField
          label='Enter your username'
          variant='filled'
          id='16'
          error={error.userLength}
          onChange={(e: any) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <CustomTextField
          label='Password'
          variant='filled'
          type='password'
          id='17'
          error={error.passLength && error.passMatch}
          onChange={(e: any) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <CustomTextField
          label='Confirm password'
          type='password'
          variant='filled'
          id='15'
          error={error.passLength && error.passMatch}
          onChange={(e: any) =>
            setCredentials({ ...credentials, password2: e.target.value })
          }
        />
        <p>{error.message}</p>
        <Button
          sx={{
            color: 'inherit',
          }}
          loading={isLoading}
          onClick={registerHandler}
        >
          Register
        </Button>
      </form>
      <Button
        sx={{
          color: 'inherit',
        }}
        onClick={() => router.push('/auth/login')}
      >
        have an existing account?
      </Button>
    </div>
  )
}
