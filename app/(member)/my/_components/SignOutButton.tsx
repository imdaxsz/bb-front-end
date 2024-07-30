'use client'

import useBoundStore from '@/store'
import styles from '@/styles/my.module.scss'
import { useRouter } from 'next/navigation'
import { deleteServerToken } from '../actions'

export default function SignOutButton() {
  const resetToken = useBoundStore((state) => state.resetToken)
  const router = useRouter()

  const onClick = async () => {
    resetToken() // delete client token
    await deleteServerToken()
    router.push('/')
  }

  return (
    <button type="button" className={styles['btn-white']} onClick={onClick}>
      로그아웃
    </button>
  )
}
