/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client'

import Link from 'next/link'
import styles from '@/styles/bar.module.scss'

type SubmitOption = 'save' | 'upload'

interface EditorTopBarProps {
  mode: string
  onClick: (opt: SubmitOption) => void
  onNumClick: () => void
  savedCount: number
}

export default function EditorTopBar({
  mode,
  onClick,
  onNumClick,
  savedCount,
}: EditorTopBarProps) {
  return (
    <ul className={`${styles.topbar} ${styles['topbar-editor']}`}>
      <li className={styles.logo}>
        <Link href="/">북북</Link>
      </li>
      <li>
        <ul className={styles.right}>
          {mode === 'new' && (
            <li>
              <button
                type="button"
                aria-label="임시저장"
                className={styles.save}
              >
                <span onClick={() => onClick('save')}>임시저장</span>
                {savedCount > 0 && (
                  <span onClick={onNumClick} className={styles.number}>
                    {savedCount}
                  </span>
                )}
              </button>
            </li>
          )}
          <li>
            <button
              type="submit"
              aria-label="완료"
              className={styles.upload}
              onClick={() => onClick('upload')}
            >
              완료
            </button>
          </li>
        </ul>
      </li>
    </ul>
  )
}
