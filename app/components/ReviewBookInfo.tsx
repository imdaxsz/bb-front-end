'use client'

import { ReviewHandler } from '@/(review)/write/_hooks/useEditor'
import styles from '@/styles/bookInfo.module.scss'
import { Book } from '@/types'
import { XCircle } from '@phosphor-icons/react'
import Image from 'next/image'
import Rating from './Rating'

interface ReviewBookInfoType {
  book: Book
  rating: number
  setRating?: ReviewHandler
  isEdit?: boolean
}

export default function ReviewBookInfo({
  book,
  setRating = undefined,
  rating,
  isEdit = false,
}: ReviewBookInfoType) {
  const onRate = (i: number) => {
    if (setRating) setRating({ rating: i })
  }

  const onClickDelete = () => {
    if (setRating) setRating({ book: null, rating: 3 })
  }

  return (
    <div className={styles.wrapper}>
      {setRating && !isEdit && (
        <button
          type="button"
          aria-label="삭제"
          className={styles.delete}
          onClick={onClickDelete}
        >
          <XCircle size={30} weight="fill" />
        </button>
      )}
      <div className={`${setRating ? styles['img-sm'] : styles['img-lg']}`}>
        <Image fill sizes="100%" src={book.cover} alt={book.title} />
      </div>
      <div className={styles.info}>
        <h2 className={`${styles.title}`}>{book.title}</h2>
        <p>저자&nbsp; {book.author}</p>
        <p>출판&nbsp; {book.publisher}</p>
        <Rating size="lg" value={rating} readonly={!isEdit} onRate={onRate} />
      </div>
    </div>
  )
}
