'use client'

import useSignOut from '@/(auth)/_hooks/useSignOut'

export default function SignOutButton() {
  const { signOut } = useSignOut()

  return (
    <button type="button" className="btn btn-light" onClick={() => signOut()}>
      로그아웃
    </button>
  )
}
