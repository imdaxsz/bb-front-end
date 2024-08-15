'use client'

import { fetchTokenCookie } from '@/(auth)/_utils/fetchTokenCookie'
import useBoundStore from '@/stores'
import { PageSearchParams } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function GoogleCallback({ searchParams }: PageSearchParams) {
  const router = useRouter()
  const fetchToken = useBoundStore((state) => state.fetchToken)

  const { token, msg } = searchParams
  if (msg && msg === 'conflict') {
    window.alert('이메일로 가입된 계정입니다. 이메일 로그인을 이용해 주세요.')
    router.replace('/signin')
  }

  useEffect(() => {
    if (typeof token === 'string') {
      fetchToken(token)
      fetchTokenCookie(token)
    }
  }, [fetchToken, token])

  return <div />
}
