'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * @description 쿠키에 토큰 저장
 */
export const fetchTokenCookie = async (token: string) => {
  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 6,
    path: '/',
    sameSite: 'lax',
  })

  redirect('/')
}
