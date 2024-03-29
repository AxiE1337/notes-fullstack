import { Avatar, Button } from '@mui/material'
import { useRouter } from 'next/router'
import { trpc } from '../utils/trpc'
import Dashboard from './dashboard'

export default function Navbar() {
  const router = useRouter()
  const isAuth = trpc.useQuery(['auth.get'])
  const isLoggedIn = isAuth.data?.isAuthenticated as boolean
  const username = isAuth.data?.username as string

  return (
    <div className='flex items-center justify-between w-sceen h-10 bg-indigo-200 dark:bg-slate-900 dark:text-gray-300'>
      <Button
        sx={{
          color: 'inherit',
        }}
        className='ml-2'
        onClick={() => router.push('/')}
      >
        Notes
      </Button>

      <div className='flex items-center'>
        {isLoggedIn && (
          <Avatar
            className='mr-2'
            alt='A'
            sx={{ bgcolor: 'green', width: 30, height: 30 }}
          >
            {username[0]}
          </Avatar>
        )}
        {isLoggedIn && <Dashboard isLoggedIn={isLoggedIn} />}
        {!isLoggedIn && (
          <Button
            sx={{
              color: 'inherit',
            }}
            onClick={() => router.push('/auth/login')}
          >
            Log in
          </Button>
        )}
      </div>
    </div>
  )
}
