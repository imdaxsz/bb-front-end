/* eslint-disable react/no-unstable-nested-components */

'use client'

import { debounce } from 'lodash'

import styles from '@/styles/modal.module.scss'
import { Trash } from '@phosphor-icons/react'
import { formatDate } from '@/utils/formatDate'

import Loader from '@/components/Loader'
import Modal from '@/components/Modal'
import useSavedReview from '../_hooks/useSavedReview'
import { ReviewHandler } from '../_hooks/useEditor'

interface Props {
  onClose: () => void
  setReview: ReviewHandler
}

export default function SavedList({ onClose, setReview }: Props) {
  const { savedReviews, deleteSavedReview, loading } = useSavedReview()

  const onClickDelete = (e: React.MouseEvent<SVGElement>, i: number) => {
    e.stopPropagation()
    const ok = window.confirm(
      '선택된 임시저장 글을 삭제하시겠습니까?\n삭제된 글은 복구되지 않습니다.',
    )
    if (ok) {
      deleteSavedReview(i)
    }
  }

  const loadReview = debounce((i: number) => {
    // 리뷰 불러오기
    const { book, text, rating } = savedReviews[i]
    setReview({ book, text, rating })
    onClose()
  }, 300)

  function Content() {
    return (
      <>
        {loading && <Loader />}
        <div className={`${styles.title} ${styles.mb}`}>임시저장</div>
        <hr />
        <div className={`${styles.list} ${styles.g0}`}>
          {savedReviews.map((review, i) => (
            <div
              className={styles['list-item']}
              key={review._id}
              onClick={() => loadReview(i)}
            >
              <div className={styles.review}>
                <div className="ellipsis">{review.book.title}</div>
                <div className={styles['text-sm']}>
                  {formatDate(new Date(review.date), '-')}
                </div>
              </div>
              <button type="button" aria-label="삭제" className={styles.icon}>
                <Trash size={20} onClick={(e) => onClickDelete(e, i)} />
              </button>
            </div>
          ))}
        </div>
      </>
    )
  }

  function Bottom() {
    return (
      <button type="button" onClick={onClose} className="btn btn-light">
        닫기
      </button>
    )
  }

  return (
    <Modal onClickOutside={onClose} content={<Content />} bottom={<Bottom />} />
  )
}
