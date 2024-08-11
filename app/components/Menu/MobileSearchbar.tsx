'use client'

import styles from '@/styles/searchbar.module.scss'
import SearchBar from '../SearchBar'

interface MobileSearchbarProps {
  isVisible: boolean
  placeholder: string
  keyword: string
  onSearch: (value: string) => void
  onClickCancel: () => void
}

export default function MobileSearchbar({
  isVisible,
  placeholder,
  keyword,
  onSearch,
  onClickCancel,
}: MobileSearchbarProps) {
  return (
    <ul className={`${styles['mobile-search']} ${isVisible && styles.show}`}>
      <li>
        <div className={styles['mobile-searchbar']}>
          <SearchBar
            placeholder={placeholder}
            keyword={keyword}
            onSearch={onSearch}
          />
        </div>
      </li>
      <li onClick={onClickCancel}>
        <span>취소</span>
      </li>
    </ul>
  )
}
