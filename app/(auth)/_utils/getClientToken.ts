import useBoundStore from '@/stores'

export const getClientToken = (): string | null => {
  const { token } = useBoundStore.getState()
  return token
}
