/* eslint-disable react/no-unstable-nested-components */

'use client'

import { debounce } from 'lodash'

import styles from '@/styles/modal.module.scss'
import { Trash } from '@phosphor-icons/react'
import { formatDate } from '@/utils/formatDate'

import Modal from '@/components/Modal'
import { Review } from '@/types'
import { ReviewHandler } from '../_hooks/useEditor'
import useDeleteSavedReview from '../_hooks/useDeleteSavedReview'

interface Props {
  reviews: Review[]
  onClose: () => void
  setReview: ReviewHandler
}

export default function SavedList({ reviews, onClose, setReview }: Props) {
  const deleteReviewMutation = useDeleteSavedReview()

  const onClickDelete = (e: React.MouseEvent<SVGElement>, id: string) => {
    e.stopPropagation()
    const ok = window.confirm(
      '선택된 임시저장 글을 삭제하시겠습니까?\n삭제된 글은 복구되지 않습니다.',
    )
    if (ok) {
      deleteReviewMutation.mutate(id)
    }
  }

  const loadReview = debounce((i: number) => {
    // 리뷰 불러오기
    const { book, text, rating } = reviews[i]
    setReview({ book, text, rating })
    onClose()
  }, 300)

  function Content() {
    return (
      <>
        <h2 className={`${styles.title} ${styles.mb}`}>임시저장</h2>
        <hr />
        <div className={`${styles.list} ${styles.g0}`}>
          {reviews.map((review, i) => (
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
                <Trash
                  size={20}
                  onClick={(e) => onClickDelete(e, review._id)}
                />
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
