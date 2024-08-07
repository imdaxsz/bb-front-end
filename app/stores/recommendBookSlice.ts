import { Book } from '@/types'
import { StateCreator } from 'zustand'

type State = {
  categoryId: string
  recommendBook: Book | null
  isModalVisible: boolean
}

type Actions = {
  setCategoryId: (categoryId: string) => void
  setRecommendBook: (book: Book) => void
  resetRecommendBook: () => void
  toggleModal: () => void
}

export type RecommendBookSlice = State & Actions

const initialState: State = {
  categoryId: '',
  recommendBook: null,
  isModalVisible: false,
}

export const createRecommendBookSlice: StateCreator<RecommendBookSlice> = (
  set,
) => ({
  ...initialState,
  setCategoryId: (categoryId) => set({ categoryId }),
  setRecommendBook: (recommendBook) => set({ recommendBook }),
  resetRecommendBook: () => set(initialState),
  toggleModal: () =>
    set((state) => ({ isModalVisible: !state.isModalVisible })),
})
