'use server'

import { fetchExtended, nextFetch } from '@/lib/fetch'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * @description 구글 로그인
 * @returns token
 */
export const fetchGoogleSignToken = async (code: string) => {
  return fetchExtended<{ token: string }>(
    `${process.env.NEXT_PUBLIC_API_ROOT}/auth/google?code=${code}`,
  ).then((res) => res.body)
}

/**
 * @description 이메일 로그인
 * @returns token
 */
export const requestEmailSignIn = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  return fetchExtended<{ token: string }>(
    `${process.env.NEXT_PUBLIC_API_ROOT}/api/user/signin`,
    {
      method: 'POST',
      body: { email, password },
    },
  ).then((res) => res.body)
}

/**
 * @description 쿠키에 토큰 저장
 */
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

/**
 * @description 쿠키 토큰 삭제
 */
export const deleteServerToken = async () => {
  cookies().delete('token')
}

/**
 * @description 회원탈퇴
 * @param {string} password
 */
export const deleteAccount = async (password: string) => {
  return nextFetch('/api/user/delete_account', {
    method: 'DELETE',
    body: { password },
  })
}
