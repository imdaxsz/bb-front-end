import { create } from 'zustand'
import { createSelectedBookSlice, SelectedBookSlice } from './selectedBookSlice'
import { AuthSlice, createPersistedAuthSlice } from './authSlice'
import {
  CertificationSlice,
  createCertificationSlice,
} from './certificationSlice'
import {
  createRecommendBookSlice,
  RecommendBookSlice,
} from './recommendBookSlice'

type StoreState = SelectedBookSlice &
  AuthSlice &
  CertificationSlice &
  RecommendBookSlice

const useBoundStore = create<StoreState>()((...a) => ({
  ...createCertificationSlice(...a),
  ...createSelectedBookSlice(...a),
  ...createRecommendBookSlice(...a),
  ...createPersistedAuthSlice(...a),
}))

export default useBoundStore
