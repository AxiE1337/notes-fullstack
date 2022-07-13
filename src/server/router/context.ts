import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { prisma } from '../../../prisma/prisma'
import { decode, sign, verify } from 'jsonwebtoken'
import nookies from 'nookies'

interface IToken {
  id: string
  username: string
  iat: number
  exp: number
}

export const createContext = (opts?: trpcNext.CreateNextContextOptions) => {
  const req = opts?.req
  const res = opts?.res

  const decodeToken = (token: string) => {
    try {
      verify(token as string, process.env.JWT_SECRET as string)
      const decodedToken = decode(token) as IToken
      return {
        id: decodedToken.id,
        username: decodedToken.username,
        isValid: true,
      }
    } catch (e) {
      return {
        isValid: false,
      }
    }
  }
  const signToken = (id: string, username: string) => {
    return sign(
      { id: id, username: username },
      process.env.JWT_SECRET as string,
      {
        expiresIn: 80 * 80,
      }
    )
  }

  const setJwtCookie = (data: string) => {
    nookies.set(opts, 'jwt', data, { maxAge: 80 * 80, path: '*' })
  }

  const delJwtCookie = () => {
    nookies.destroy(opts, 'jwt')
  }

  return {
    req,
    res,
    prisma,
    setJwtCookie,
    decodeToken,
    signToken,
    delJwtCookie,
  }
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

export const createRouter = () => trpc.router<Context>()
