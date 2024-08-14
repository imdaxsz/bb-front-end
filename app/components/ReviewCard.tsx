import styles from '@/styles/card.module.scss'
import { Review } from '@/types'

import BookCard from './BookCard'
import Rating from './Rating'

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <BookCard
      type="review"
      id={review._id}
      title={review.book.title}
      cover={review.book.cover}
    >
      <div className={styles.rating}>
        <Rating value={review.rating} readonly />
      </div>
    </BookCard>
  )
}
