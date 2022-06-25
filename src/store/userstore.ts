import create from 'zustand'

interface userData {
  user: any
  isLoggedIn: boolean
  setUser: (payload: {}) => void
  setIsLoggedIn: (payload: boolean) => void
}

export const useStore = create<userData>()((set) => ({
  user: {},
  isLoggedIn: false,

  setUser: (payload: any) => set((state) => ({ user: (state.user = payload) })),
  setIsLoggedIn: (payload: boolean) =>
    set((state) => ({ isLoggedIn: (state.isLoggedIn = payload) })),
}))
