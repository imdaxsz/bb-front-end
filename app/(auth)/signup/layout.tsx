import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '@/styles/auth.module.scss'

export const metadata: Metadata = {
  title: '회원가입',
}

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link href="/">북북</Link>
        </div>
        {children}
      </div>
    </div>
  )
}
