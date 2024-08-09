import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '@/styles/auth.module.scss'

export const metadata: Metadata = {
  title: '비밀번호 찾기',
}

export default function FindPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link href="/">
            <h1>북북</h1>
          </Link>
        </div>
        {children}
      </div>
    </div>
  )
}
