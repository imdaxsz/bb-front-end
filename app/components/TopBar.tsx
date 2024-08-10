import Link from 'next/link'
import styles from '@/styles/bar.module.scss'

export default function TopBar() {
  return (
    <header className={styles.wrapper}>
      <ul className={styles.topbar}>
        <li className={styles.logo}>
          <Link href="/">
            <h1>북북</h1>
          </Link>
        </li>
        <li>
          <ul className={styles.right}>
            <li>
              <Link href="/write?mode=new" prefetch={false}>
                리뷰작성
              </Link>
            </li>
            <li>
              <Link href="/my" prefetch={false}>
                MY
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </header>
  )
}
