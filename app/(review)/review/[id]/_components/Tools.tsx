'use client'

import styles from '@/styles/detail.module.scss'
import { debounce } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import review from '@/(review)/services'
import useHandleUnauthorized from '@/(auth)/_hooks/useHandleUnauthorized'

interface ToolsProps {
  id: string
}

export default function Tools({ id }: ToolsProps) {
  const { handleUnauthorized } = useHandleUnauthorized()
  const router = useRouter()

  const onClickDelete = debounce(async () => {
    const ok = window.confirm(
      '삭제된 글은 복구할 수 없습니다.\n삭제하시겠습니까?',
    )
    if (ok) {
      try {
        await review.deleteReview(id)
        window.alert('삭제되었습니다.')
        router.push('/')
        router.refresh()
      } catch (error) {
        window.alert('로그인 시간이 만료되었습니다. 다시 로그인해 주세요.')
        handleUnauthorized(error)
      }
    }
  }, 300)

  return (
    <div className={styles.tool}>
      <div className={styles['tool-item']}>
        <Link href={`/write?mode=edit&logNo=${id}`}>수정</Link>
      </div>
      <button
        type="button"
        className={styles['tool-item']}
        onClick={onClickDelete}
      >
        삭제
      </button>
    </div>
  )
}
