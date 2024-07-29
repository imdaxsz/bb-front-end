'use client'

import Image from 'next/image'
import styles from '@/styles/auth.module.scss'

export default function GoogleLoginButton() {
  const onClickGoogle = () => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid email profile`
  }

  return (
    <button className={styles.google} type="button" onClick={onClickGoogle}>
      <Image
        src="/google.svg"
        alt="google icon"
        width={20}
        height={20}
        priority
      />
      <span>구글 계정으로 로그인</span>
    </button>
  )
}
