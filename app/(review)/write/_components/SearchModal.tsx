/* eslint-disable no-use-before-define */

'use client'

import { useRef, useState } from 'react'
import styles from '@/styles/modal.module.scss'

import { DetailBookResponse } from '@/types'
import useBoundStore from '@/stores'
import Modal from '@/components/Modal'
import SearchBar from '@/components/SearchBar'
import SearchBookItem from './SearchBookItem'
import { searchBooks } from '../actions'
import { ReviewHandler } from '../_hooks/useEditor'

interface SearchBook {
  onClose: () => void
  setBook: ReviewHandler
}

export default function SearchModal({ onClose, setBook }: SearchBook) {
  const listRef = useRef<HTMLDivElement | null>(null)
  const [books, setBooks] = useState<DetailBookResponse[] | null>(null)
  const { selectedBook, resetSelectedBook } = useBoundStore((state) => ({
    selectedBook: state.selectedBook,
    resetSelectedBook: state.resetSelectedBook,
  }))

  const onClickCancel = () => {
    onClose()
    setBooks(null)
    resetSelectedBook()
  }

  const onClickOk = () => {
    if (!selectedBook) {
      window.alert('책을 선택해주세요!')
      return
    }
    setBook({ book: selectedBook })
    onClose()
    resetSelectedBook()
  }

  const onSearch = async (keyword: string) => {
    const res = await searchBooks(keyword)
    setBooks(res.item)
    if (listRef.current) listRef.current.scrollTop = 0
  }

  return (
    <Modal
      onClickOutside={onClickCancel}
      content={<Content listRef={listRef} result={books} onSearch={onSearch} />}
      bottom={<Bottom onClickCancel={onClickCancel} onClickOk={onClickOk} />}
    />
  )
}

interface ContentProps {
  listRef: React.MutableRefObject<HTMLDivElement | null>
  result: DetailBookResponse[] | null
  onSearch: (keyword: string) => void
}

function Content({ listRef, result, onSearch }: ContentProps) {
  return (
    <>
      <div className={styles.searchbar}>
        <SearchBar placeholder="책 검색" onSearch={onSearch} />
      </div>
      <div className={styles.list} ref={listRef}>
        {result &&
          result.map((book) => <SearchBookItem book={book} key={book.isbn} />)}
        {result && result.length === 0 && <p>검색 결과가 없습니다.</p>}
      </div>
    </>
  )
}

interface BottomProps {
  onClickCancel: () => void
  onClickOk: () => void
}

function Bottom({ onClickCancel, onClickOk }: BottomProps) {
  return (
    <>
      <button type="button" onClick={onClickCancel} className="btn btn-light">
        취소
      </button>
      <button type="button" onClick={onClickOk} className="btn btn-primary">
        선택
      </button>
    </>
  )
}
