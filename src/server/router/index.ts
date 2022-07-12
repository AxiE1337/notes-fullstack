import { createRouter } from './context'
import { notes } from './notes'
import { auth } from './auth'

export const appRouter = createRouter()
  .merge('notes.', notes)
  .merge('auth.', auth)

export type AppRouter = typeof appRouter
