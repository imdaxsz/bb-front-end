import { deleteServerToken } from '@/(auth)/actions'
import useBoundStore from '@/stores'
import { useRouter } from 'next/navigation'

export default function useSignOut() {
  const resetToken = useBoundStore((state) => state.resetToken)
  const router = useRouter()

  const signOut = async () => {
    resetToken() // delete client token
    await deleteServerToken()
    router.push('/')
  }

  return { signOut }
}
