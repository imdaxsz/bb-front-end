'use server'

import { cookies } from 'next/headers'

export const getServerToken = async () => {
  const token = cookies().get('token')?.value || ''
  return token
}
