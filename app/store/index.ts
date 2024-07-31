import { create } from 'zustand'
import { AuthSlice, createPersistedAuthSlice } from './authSlice'
import {
  CertificationSlice,
  createCertificationSlice,
} from './certificationSlice'

type StoreState = AuthSlice & CertificationSlice

const useBoundStore = create<StoreState>()((...a) => ({
  ...createCertificationSlice(...a),
  ...createPersistedAuthSlice(...a),
}))

export default useBoundStore
