'use client'

import { fetchTokenCookie } from '@/(auth)/actions'
import useBoundStore from '@/store'
import { PageSearchParams } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function GoogleCallback({ searchParams }: PageSearchParams) {
  const router = useRouter()
  const fetchToken = useBoundStore((state) => state.fetchToken)

  const { token } = searchParams
  if (!token) router.push('/')

  useEffect(() => {
    if (typeof token === 'string') {
      fetchToken(token)
      fetchTokenCookie(token)
    }
  }, [fetchToken, token])

  return <div />
}
