import { StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  token: string | null
}

type Actions = {
  fetchToken: (token: string | null) => void
  resetToken: () => void
}

export type AuthSlice = State & Actions

const initialState: State = {
  token: null,
}

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  ...initialState,
  fetchToken: (token) => set({ token }),
  resetToken: () => set(initialState),
})

export const createPersistedAuthSlice = persist(createAuthSlice, {
  name: 'bookbook',
})
