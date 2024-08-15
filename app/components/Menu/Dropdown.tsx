import Link from 'next/link'
import { useState } from 'react'
import styles from '@/styles/dropdown.module.scss'
import { usePathname, useSearchParams } from 'next/navigation'

export interface DropdownProps {
  selectedValue: string
  items: string[]
  keys: string[]
}

export default function Dropdown({
  selectedValue,
  items,
  keys,
}: DropdownProps) {
  const [display, setDisplay] = useState('')

  const onClick = () => {
    setDisplay((prev) => (prev === '' ? 'block' : ''))
  }

  const selectFilter = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    setDisplay('')
  }

  const searchParams = useSearchParams()
  const pathname = usePathname()

  const getNextUrl = (key: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (!key) {
      params.delete('sort')
      return `${pathname}?${params.toString()}`
    }
    const [name, value] = key.split('=')
    params.set(name, value)
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className={styles.container} onClick={onClick}>
      <Link href="#" role="button">
        {selectedValue}
      </Link>
      <ul className={`${styles.list} ${display}`}>
        {items.map((item, i) => (
          <li key={keys[i]} onClick={selectFilter}>
            <Link
              href={getNextUrl(keys[i])}
              role="button"
              className={item === selectedValue ? 'selected' : ''}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
