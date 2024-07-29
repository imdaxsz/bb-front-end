'use server'

import { fetchExtended } from '@/lib/fetch'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const requestGoogleSignToken = async (code: string) => {
  return fetchExtended<{ token: string }>(
    `${process.env.NEXT_PUBLIC_API_ROOT}/auth/google?code=${code}`,
  ).then((res) => res.body)
}

export const fetchTokenCookie = (token: string) => {
  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 6,
    path: '/',
    sameSite: 'lax',
  })

  redirect('/')
}

export const requestEmailSignIn = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const { token } = await fetchExtended<{ token: string }>(
    `${process.env.NEXT_PUBLIC_API_ROOT}/api/user/signin`,
    {
      method: 'POST',
      body: { email, password },
    },
  ).then((res) => res.body)

  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 6,
    path: '/',
  })

  return { token }
}
