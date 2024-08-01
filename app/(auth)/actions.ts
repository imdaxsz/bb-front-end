'use server'

import { nextFetch } from '@/libs/fetch'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * @description 구글 로그인
 * @returns token
 */
export const fetchGoogleSignToken = async (code: string) => {
  return nextFetch<{ token: string }>(
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
  return nextFetch<{ token: string }>(
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

/**
 * @description 쿠키 토큰 삭제
 */
export const deleteServerToken = async () => {
  cookies().delete('token')
}

/**
 * @description 이메일 중복 확인
 * @param {string} email
 */
export const checkEmail = async (email: string) => {
  return nextFetch<{ exists: boolean }>('/api/user/checkemail', {
    method: 'POST',
    body: { email },
  }).then((res) => res.body)
}

/**
 * @description 이메일 인증번호 요청
 * @param {string} email
 */
export const requestEmailCertification = async (email: string) => {
  return nextFetch<{ exists: boolean }>('/api/certification/send-email', {
    method: 'POST',
    body: { email },
  }).then((res) => res.body)
}

/**
 * @description 인증번호 검증
 * @param {string} email
 * @param {string} code
 */
export const verifyCode = async (email: string, code: string) => {
  return nextFetch<{ exists: boolean }>('/api/certification/verify-code', {
    method: 'POST',
    body: { email, userCode: code },
  }).then((res) => res.body)
}

/**
 * @description 이메일 인증 상태 확인
 * @param {string} email
 */
export const checkCertiStatus = async (email: string) => {
  return nextFetch<{ certified: boolean }>(
    `/api/certification/certi-status/${email}`,
  ).then((res) => res.body)
}

/**
 * @description 회원가입
 * @param {string} email
 * @param {string} password
 */
export const signUp = async (email: string, password: string) => {
  return nextFetch('/api/user/signup', {
    method: 'POST',
    body: { email, password },
  }).then((res) => res.body)
}

/**
 * @description 비밀번호 분실 시 재설정
 * @param {string} email
 * @param {string} password
 */
export const resetPassword = async (email: string, password: string) => {
  return nextFetch('/api/user/reset_password', {
    method: 'PATCH',
    body: { email, password },
  }).then((res) => res.body)
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
