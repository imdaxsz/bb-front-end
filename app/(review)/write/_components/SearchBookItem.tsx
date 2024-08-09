'use client'

import useBoundStore from '@/stores'
import styles from '@/styles/book.module.scss'
import { DetailBookResponse } from '@/types'
import Image from 'next/image'

interface Props {
  book: DetailBookResponse
}

export default function SearchBookItem({ book }: Props) {
  const { selectedBook, selectBook, setCategoryId } = useBoundStore(
    (state) => ({
      selectedBook: state.selectedBook,
      selectBook: state.setSelectedBook,
      setCategoryId: state.setCategoryId,
    }),
  )
  const isSelected = selectedBook && selectedBook.isbn === book.isbn

  const onClick = () => {
    selectBook(book)
    setCategoryId(book.categoryId)
  }

  return (
    <div
      className={`${styles.wrapper} ${styles.hover} ${
        isSelected ? styles.focus : ''
      }`}
      onClick={onClick}
    >
      <div className={styles['img-sm']}>
        <Image fill sizes="100%" src={book.cover} alt={book.title} />
      </div>
      <div className={styles.info}>
        <strong className={`${styles.title} ellipsis`}>{book.title}</strong>
        <p>저자&nbsp; {book.author}</p>
        <p>출판&nbsp; {book.publisher}</p>
      </div>
    </div>
  )
}
