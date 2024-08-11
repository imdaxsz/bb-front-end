import styles from '@/styles/card.module.scss'
import { Book } from '@/types'

import BookCard from './BookCard'

interface BookInfoCardProps {
  book: Book
  onImageClick?: () => void
}

export default function BookInfoCard({
  book,
  onImageClick,
}: BookInfoCardProps) {
  return (
    <BookCard
      type="book"
      id={book.isbn}
      title={book.title}
      cover={book.cover}
      onImageClick={onImageClick}
    >
      <p className={`${styles.author} ellipsis`}>{book.author}</p>
    </BookCard>
  )
}
