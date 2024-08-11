import Link from 'next/link'
import { useState } from 'react'
import styles from '@/styles/dropdown.module.scss'

interface DropdownProps {
  initialValue: string
  items: string[]
  keys: string[]
}

export default function Dropdown({ initialValue, items, keys }: DropdownProps) {
  const [display, setDisplay] = useState('')
  const [currentValue, setCurrentValue] = useState(initialValue)

  const onClick = () => {
    setDisplay((prev) => (prev === '' ? 'block' : ''))
  }

  const selectFilter = (e: React.MouseEvent<HTMLLIElement>, i: number) => {
    e.stopPropagation()
    setCurrentValue(items[i])
    setDisplay('')
  }

  return (
    <div className={styles.container} onClick={onClick}>
      <Link href="#" role="button">
        {currentValue}
      </Link>
      <ul className={`${styles.list} ${display}`}>
        {items.map((item, i) => (
          <li key={keys[i]} onClick={(e) => selectFilter(e, i)}>
            <Link
              href={`?${keys[i]}`}
              role="button"
              className={item === currentValue ? 'selected' : ''}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
