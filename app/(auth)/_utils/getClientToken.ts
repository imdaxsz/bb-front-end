import useBoundStore from '@/store'

export const getClientToken = (): string | null => {
  const { token } = useBoundStore.getState()
  return token
}
