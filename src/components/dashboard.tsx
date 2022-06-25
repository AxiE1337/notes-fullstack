import { Button, MenuItem, Menu } from '@mui/material'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { MuiSwitch } from '../ui/muiSwitch'
import { useStore } from '../store/themestore'

interface DashboardProps {
  isLoggedIn: boolean
}

export default function Dashboard({ isLoggedIn }: DashboardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { logout } = useAuth()
  const setTheme = useStore((state) => state.setTheme)
  const theme = useStore((state) => state.theme)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleTheme = (e: any) => {
    setTheme(e.target.checked)
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
        <MenuItem onClick={handleClose}>My account</MenuItem>
        {isLoggedIn && (
          <MenuItem className='justify-center' onClick={() => logout()}>
            Log out
          </MenuItem>
        )}
      </Menu>
    </div>
  )
}
