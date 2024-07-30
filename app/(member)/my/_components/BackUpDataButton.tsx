'use client'

import styles from '@/styles/my.module.scss'
import useBackUpData from '../_hooks/useBackUpData'

export default function BackUpDataButton() {
  const { onClickBackUp } = useBackUpData()

  return (
    <button
      type="button"
      className={styles['btn-primary']}
      onClick={onClickBackUp}
    >
      데이터 요청하기
    </button>
  )
}
