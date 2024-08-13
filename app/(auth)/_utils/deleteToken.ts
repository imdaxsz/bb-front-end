'use server'

import { cookies } from 'next/headers'

export const deleteServerToken = async () => {
  cookies().delete('token')
}
