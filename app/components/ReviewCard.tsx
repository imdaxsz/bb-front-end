import { Star } from '@phosphor-icons/react/dist/ssr'

import styles from '@/styles/card.module.scss'
import { Review } from '@/types'

import { v4 as uuidv4 } from 'uuid'
import BookCard from './BookCard'

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <BookCard
      type="review"
      id={review._id}
      title={review.book.title}
      cover={review.book.cover}
    >
      <div className={styles.rating}>
        {[...Array(review.rating)].map(() => (
          <Star weight="fill" className="star" key={uuidv4()} />
        ))}
        {[...Array(5 - review.rating)].map(() => (
          <Star className="star" key={uuidv4()} />
        ))}
      </div>
    </BookCard>
  )
}
