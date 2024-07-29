'use client'

import { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

import styles from '@/styles/searchbar.module.scss'

import { MagnifyingGlass } from '@phosphor-icons/react'

interface Props {
  placeholder: string
  keyword?: string
  onSearch: (value: string) => void
}

export default function SearchBar({ placeholder, keyword, onSearch }: Props) {
  const focusRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const [word, setWord] = useState(keyword ?? '')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    if (value.length > 15) return
    setWord(value)
  }

  const focusSearchBar = () => {
    if (focusRef.current instanceof HTMLInputElement) focusRef.current.focus()
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (focusRef.current instanceof HTMLInputElement) focusRef.current.blur()
    onSearch(word)
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="검색"
      role="search"
      className={`${pathname === '/write' && styles.med}`}
    >
      <div className={styles.container} onClick={focusSearchBar}>
        <button type="submit" aria-label="검색" className={styles.icon}>
          <MagnifyingGlass
            weight="bold"
            size={`${pathname === '/write' ? 24 : 20}`}
          />
        </button>
        <input
          onChange={onChange}
          type="text"
          value={word}
          placeholder={placeholder}
          className={styles.input}
          ref={focusRef}
        />
      </div>
    </form>
  )
}
