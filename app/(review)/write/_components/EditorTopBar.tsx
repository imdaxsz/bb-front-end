/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client'

import Link from 'next/link'
import styles from '@/styles/bar.module.scss'

interface EditorTopBarProps {
  mode: string
  onSubmit: () => void
  onSaveClick: () => void
  onNumClick: () => void
  savedCount: number
}

export default function EditorTopBar({
  mode,
  onSubmit,
  onSaveClick,
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
              <div aria-label="임시저장" className={styles.save}>
                <button type="button" onClick={onSaveClick}>
                  임시저장
                </button>
                {savedCount > 0 && (
                  <button
                    type="button"
                    onClick={onNumClick}
                    className={styles.number}
                  >
                    {savedCount}
                  </button>
                )}
              </div>
            </li>
          )}
          <li>
            <button
              type="submit"
              aria-label="완료"
              className={styles.upload}
              onClick={onSubmit}
            >
              완료
            </button>
          </li>
        </ul>
      </li>
    </ul>
  )
}
