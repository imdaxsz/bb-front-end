import Link from 'next/link'
import styles from '@/styles/bar.module.scss'

export default function TopBar() {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.topbar}>
        <li className={styles.logo}>
          <Link href="/">북북</Link>
        </li>
        <li>
          <ul className={styles.right}>
            <li>
              <Link href="/write?mode=new" prefetch={false}>
                후기작성
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
    </div>
  )
}
