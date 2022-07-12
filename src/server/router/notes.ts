import { createRouter } from './context'
import { z } from 'zod'

export const notes = createRouter()
  .query('get', {
    async resolve({ ctx }) {
      const token = ctx.req?.headers.cookie?.slice(4)
      const decodedToken = ctx.decodeToken(token as string)

      return await ctx.prisma.note.findMany({
        where: {
          userId: decodedToken?.id,
        },
      })
    },
  })
  .mutation('add', {
    input: z.object({
      title: z.string(),
      content: z.string(),
    }),
    async resolve({ input, ctx }) {
      const token = ctx.req?.headers.cookie?.slice(4)
      const decodedToken = ctx.decodeToken(token as string)
      return await ctx.prisma.note.create({
        data: {
          title: input.title,
          content: input.content,
          userId: decodedToken?.id as string,
        },
      })
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.note.delete({
        where: { id: input.id },
      })
    },
  })
  .mutation('update', {
    input: z.object({
      id: z.number(),
      title: z.string(),
      content: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.note.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
        },
      })
    },
  })
