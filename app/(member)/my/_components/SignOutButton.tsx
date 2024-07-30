'use client'

import useSignOut from '@/(auth)/_hooks/useSignOut'
import styles from '@/styles/my.module.scss'

export default function SignOutButton() {
  const { signOut } = useSignOut()

  return (
    <button type="button" className={styles['btn-white']} onClick={signOut}>
      로그아웃
    </button>
  )
}
