import { MenuItem, Menu } from '@mui/material'
import { LoadingButton as Button } from '@mui/lab'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { MuiSwitch } from '../ui/muiSwitch'
import { useStore } from '../store/themestore'

interface DashboardProps {
  isLoggedIn: boolean
}

export default function Dashboard({ isLoggedIn }: DashboardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [popOver, setPopOver] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const open = Boolean(anchorEl)
  const { logout, deleteUser } = useAuth()
  const setTheme = useStore((state) => state.setTheme)
  const theme = useStore((state) => state.theme)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setPopOver(false)
  }
  const handleTheme = (e: any) => {
    setTheme(e.target.checked)
  }

  const handelDelete = async () => {
    setIsLoading(true)
    await deleteUser()
    setIsLoading(false)
  }

  if (theme) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  return (
    <div>
      <Button
        sx={{
          color: 'inherit',
        }}
        id='basic-button'
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id='user-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
          <MuiSwitch sx={{ m: 1 }} checked={theme} onClick={handleTheme} />
          <p>{!theme ? 'light' : 'dark'}</p>
        </MenuItem>
        <MenuItem
          className='justify-center'
          onClick={() => setPopOver((prev) => !prev)}
        >
          {!popOver ? 'Delete user' : 'Cancel'}
        </MenuItem>
        {popOver && (
          <div className='flex flex-col justify-center border'>
            <p className='text-sm mx-2 mt-1 text-center'>
              User and notes will be deleted!
            </p>
            <Button loading={isLoading} color='error' onClick={handelDelete}>
              Confirm Delete
            </Button>
          </div>
        )}
        {isLoggedIn && (
          <MenuItem className='justify-center' onClick={() => logout()}>
            Log out
          </MenuItem>
        )}
      </Menu>
    </div>
  )
}
