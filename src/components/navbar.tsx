import { Avatar, Button } from '@mui/material'
import { useRouter } from 'next/router'
import Dashboard from './dashboard'

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
      <Button className='ml-2' onClick={() => router.push('/')}>
        Notes
      </Button>

      <div className='flex items-center'>
        {isLoggedIn && (
          <Avatar
            className='mr-2'
            alt='A'
            sx={{ bgcolor: 'green', width: 30, height: 30 }}
          >
            {user.username[0]}
          </Avatar>
        )}
        {isLoggedIn && <Dashboard isLoggedIn={isLoggedIn} />}
        {!isLoggedIn && (
          <Button onClick={() => router.push('/auth/login')}>Log in</Button>
        )}
      </div>
    </div>
  )
}
