'use client'

import useBoundStore from '@/stores'
import styles from '@/styles/book.module.scss'
import { Book } from '@/types'
import Image from 'next/image'

interface Props {
  book: Book
}

export default function SearchBookItem({ book }: Props) {
  const selectedBook = useBoundStore((state) => state.book)
  const selectBook = useBoundStore((state) => state.setSelectedBook)
  const isSelected = selectedBook && selectedBook.isbn === book.isbn

  return (
    <div
      className={`${styles.wrapper} ${styles.hover} ${
        isSelected ? styles.focus : ''
      }`}
      onClick={() => selectBook(book)}
    >
      <div className={styles['img-sm']}>
        <Image fill src={book.cover} alt={book.title} />
      </div>
      <div className={styles.info}>
        <div className={`${styles.title} ellipsis`}>{book.title}</div>
        <p>저자&nbsp; {book.author}</p>
        <p>출판&nbsp; {book.publisher}</p>
      </div>
    </div>
  )
}
