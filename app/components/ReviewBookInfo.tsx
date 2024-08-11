'use client'

import { ReviewHandler } from '@/(review)/write/_hooks/useEditor'
import styles from '@/styles/bookInfo.module.scss'
import { Book } from '@/types'
import { Star, XCircle } from '@phosphor-icons/react'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'

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
  const onClickStar = (i: number) => {
    if (setRating) setRating({ rating: i + 1 })
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
        <div className={`${styles.rating} ${setRating && 'pointer'}`}>
          {[...Array(rating)].map((a, i) => (
            <Star
              weight="fill"
              className="star-lg"
              key={uuidv4()}
              onClick={() => onClickStar(i)}
            />
          ))}
          {[...Array(5 - rating)].map((_, i) => (
            <Star
              className="star-lg"
              key={uuidv4()}
              onClick={() => onClickStar(rating + i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
