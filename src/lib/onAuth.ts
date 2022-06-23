import axios from 'axios'
import { getCookie, removeCookies } from 'cookies-next'
import { useRouter } from 'next/router'
import { useStore } from '../store/userstore'

interface Credentials {
  username: string
  password: string
}

export const onAuth = () => {
  const router = useRouter()
  const token = getCookie('jwt')
  const setUser = useStore((state) => state.setUser)
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn)

  const register = async (credentials: Credentials) => {
    try {
      const data = await axios('/api/register', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        data: {
          username: credentials.username,
          password: credentials.password,
        },
      })
      setUser(data.data)
      setIsLoggedIn(true)
      router.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const login = async (credentials: Credentials) => {
    try {
      const data = await axios('/api/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        data: {
          username: credentials.username,
          password: credentials.password,
        },
      })
      setUser(data.data)
      setIsLoggedIn(true)
      router.reload()
    } catch (err) {
      console.log(err)
    }
  }

  // check if the user is logged in
  const isAuthenticated = async () => {
    if (!token) {
      return 'Youre not logged in'
    }
    try {
      const data = await axios.get('/api/users', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      setUser(data.data)
      setIsLoggedIn(true)
      router.push('/')
    } catch (err) {
      console.error('Some error occurred')
    }
  }
  const logout = () => {
    removeCookies('jwt')
    setIsLoggedIn(false)
    router.push('/auth/login')
  }

  return { register, login, isAuthenticated, logout }
}
