import create from 'zustand'
import { persist } from 'zustand/middleware'

interface Itheme {
  theme: boolean
  setTheme: (payload: boolean) => void
}

let store: any = (set: any) => ({
  theme: false,

  setTheme: (payload: string) =>
    set((state: any) => ({
      theme: (state.theme = payload),
    })),
})
store = persist(store)
export const useStore = create<Itheme>(store)
