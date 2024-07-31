import { Book } from '@/types'
import { StateCreator } from 'zustand'

type State = {
  book: Book | null
}

type Actions = {
  setSelectedBook: (book: Book) => void
  resetSelectedBook: () => void
}

export type SelectedBookSlice = State & Actions

const initialState: State = {
  book: null,
}

export const createSelectedBookSlice: StateCreator<SelectedBookSlice> = (
  set,
) => ({
  ...initialState,
  setSelectedBook: (book) => set({ book }),
  resetSelectedBook: () => set(initialState),
})
