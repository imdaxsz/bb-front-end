import { StateCreator } from 'zustand'

type State = {
  certifiedEmail: string
}

type Actions = {
  setCertifiedEmail: (certifiedEmail: string) => void
  resetCertifiedEmail: () => void
}

export type CertificationSlice = State & Actions

const initialState: State = {
  certifiedEmail: '',
}

export const createCertificationSlice: StateCreator<CertificationSlice> = (
  set,
) => ({
  ...initialState,
  setCertifiedEmail: (certifiedEmail) => set({ certifiedEmail }),
  resetCertifiedEmail: () => set(initialState),
})
