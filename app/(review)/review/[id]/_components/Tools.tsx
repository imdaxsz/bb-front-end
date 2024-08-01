'use client'

import styles from '@/styles/detail.module.scss'
import { debounce } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deleteReview } from '@/(review)/actions'

interface ToolsProps {
  id: string
}

export default function Tools({ id }: ToolsProps) {
  const router = useRouter()

  const onClickDelete = debounce(async () => {
    const ok = window.confirm(
      '삭제된 후기는 복구할 수 없습니다.\n삭제하시겠습니까?',
    )
    if (ok) {
      await deleteReview(id)
      window.alert('삭제되었습니다.')
      router.push('/')
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
