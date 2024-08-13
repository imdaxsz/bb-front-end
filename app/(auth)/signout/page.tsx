'use client'

import { useEffect } from 'react'
import useSignOut from '../_hooks/useSignOut'

/**
 * @description 서버 컴포넌트에서  401 오류와 같이 로그아웃 처리가 필요할 때 redirect하는 로그아웃 페이지
 */
export default function SignOutPage() {
  const { signOut } = useSignOut()

  useEffect(() => {
    signOut()
  }, [signOut])

  return <></>
}
