import { getClientToken } from './getClientToken'
import { getServerToken } from './getSeverToken'

export const getToken = async () => {
  const server = await getServerToken()
  if (server) return server
  return getClientToken()
}
