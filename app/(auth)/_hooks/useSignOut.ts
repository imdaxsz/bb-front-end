import useBoundStore from '@/stores'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { deleteServerToken } from '../_utils/deleteToken'

export default function useSignOut() {
  const resetToken = useBoundStore((state) => state.resetToken)
  const router = useRouter()

  const signOut = useCallback(
    async (redirect?: string) => {
      resetToken() // delete client token
      await deleteServerToken()
      router.push(redirect ?? '/')
    },
    [resetToken, router],
  )

  return { signOut }
}
