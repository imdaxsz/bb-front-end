'use client'

import styles from '@/styles/my.module.scss'
import { backUpReviews } from '../actions'

export default function BackUpDataButton() {
  const onClick = async () => {
    const ok = window.confirm('후기 데이터를 요청하시겠습니까?')
    if (!ok) return

    const reviews = await backUpReviews().then((res) => res.body)
    if (reviews.length === 0) {
      window.alert('작성한 후기가 없습니다!')
      return
    }

    const backUpData = JSON.stringify(reviews, null, 2)
    const blob = new Blob([backUpData], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'backup.txt'
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <button type="button" className={styles['btn-primary']} onClick={onClick}>
      데이터 요청하기
    </button>
  )
}
