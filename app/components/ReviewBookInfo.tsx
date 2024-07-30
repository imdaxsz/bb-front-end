'use client'

import { ReviewHandlerType } from '@/hooks/useReview'
import styles from '@/styles/book.module.scss'
import { Book } from '@/types'
import { Star, XCircle } from '@phosphor-icons/react'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'

interface ReviewBookInfoType {
  book: Book
  rating: number
  setRating?: ReviewHandlerType
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
        <span className={styles.delete} onClick={onClickDelete}>
          <XCircle size={30} weight="fill" />
        </span>
      )}
      <div className={`${setRating ? styles['img-sm'] : styles['img-lg']}`}>
        <Image fill src={book.cover} alt={book.title} />
      </div>
      <div className={styles.info}>
        <div className={`${styles.title}`}>{book.title}</div>
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