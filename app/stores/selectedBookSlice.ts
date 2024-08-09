import { Book } from '@/types'
import { StateCreator } from 'zustand'

type State = {
  selectedBook: Book | null
}

type Actions = {
  setSelectedBook: (book: Book) => void
  resetSelectedBook: () => void
}

export type SelectedBookSlice = State & Actions

const initialState: State = {
  selectedBook: null,
}

export const createSelectedBookSlice: StateCreator<SelectedBookSlice> = (
  set,
) => ({
  ...initialState,
  setSelectedBook: (selectedBook) => set({ selectedBook }),
  resetSelectedBook: () => set(initialState),
})
