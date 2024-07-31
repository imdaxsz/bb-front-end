import { create } from 'zustand'
import { createSelectedBookSlice, SelectedBookSlice } from './selectedBookSlice'
import { AuthSlice, createPersistedAuthSlice } from './authSlice'
import {
  CertificationSlice,
  createCertificationSlice,
} from './certificationSlice'

type StoreState = SelectedBookSlice & AuthSlice & CertificationSlice

const useBoundStore = create<StoreState>()((...a) => ({
  ...createCertificationSlice(...a),
  ...createSelectedBookSlice(...a),
  ...createPersistedAuthSlice(...a),
}))

export default useBoundStore
