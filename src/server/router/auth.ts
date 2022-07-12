import { createRouter } from './context'
import { z } from 'zod'

export const auth = createRouter()
  .mutation('login', {
    input: z.object({
      username: z.string(),
      password: z.string(),
    }),
    async resolve({ input, ctx }) {
      const user = await ctx.prisma.user.findFirst({
        where: { username: input.username, password: input.password } as object,
      })
      if (!!user?.id) {
        const jwtoken = ctx.signToken(user?.id, input.username)
        ctx.setJwtCookie(jwtoken)
        return {
          credentials: true,
        }
      }
      return {
        credentials: false,
      }
    },
  })
  .mutation('register', {
    input: z.object({
      username: z.string(),
      password: z.string(),
    }),
    async resolve({ input, ctx }) {
      const newUser = await ctx.prisma.user.create({
        data: {
          username: input.username,
          password: input.password,
        },
        include: {
          notes: true,
        },
      })
      const { id } = newUser
      const jwtoken = ctx.signToken(id, newUser.username)
      ctx.setJwtCookie(jwtoken)
    },
  })
  .mutation('logout', {
    resolve({ ctx }) {
      ctx.delJwtCookie()
    },
  })
  .mutation('deleteUser', {
    async resolve({ ctx }) {
      const token = ctx.req?.headers.cookie?.slice(4)
      const decodedToken = ctx.decodeToken(token as string)
      await ctx.prisma.note.deleteMany({
        where: { userId: decodedToken.id },
      })
      await ctx.prisma.user.delete({
        where: {
          id: decodedToken.id,
        },
      })
      ctx.delJwtCookie()
    },
  })
  .query('get', {
    async resolve({ ctx }) {
      const token = ctx.req?.headers.cookie?.slice(4)
      if (token) {
        const decodeToken = ctx.decodeToken(token as string)
        const user = await ctx.prisma.user.findFirst({
          where: { id: decodeToken?.id } as object,
        })
        return {
          username: user?.username,
          isAuthenticated: true,
        }
      }
      return {
        username: null,
        isAuthenticated: false,
      }
    },
  })
