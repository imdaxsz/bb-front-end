'use client'

import { useEffect, useMemo, useState } from 'react'

import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import styles from '@/styles/menu.module.scss'
import { MagnifyingGlass } from '@phosphor-icons/react'
import SearchBar from '../SearchBar'
import MobileSearchbar from './MobileSearchbar'
import Dropdown from './Dropdown'

export default function Menu() {
  const fullPath = usePathname()
  const pathname = fullPath.split('/')[1]
  const filterList = useMemo(() => ['최신순', '오래된 순', '제목순'], [])
  const filterPath = useMemo(() => ['', 'sort=date_asc', 'sort=title'], [])
  const [filter, setFilter] = useState(filterList[0])

  const placeholder: Record<string, string> = {
    '': '도서명으로 리뷰 검색',
    likes: '제목 검색',
    recommend: '제목 검색',
  }

  const isRecommend = ['/recommend', '/search/book'].includes(fullPath)
  const isHome = ['/', '/search/review'].includes(fullPath)

  const searchParams = useSearchParams()
  const keyword = searchParams.get('query')
  const sort = searchParams.get('sort')

  const [isMbSearchVisible, setIsMbSearchVisible] = useState(false)

  const router = useRouter()

  const onSearch = (word: string) => {
    // eslint-disable-next-line no-nested-ternary
    const option = isHome ? 'review' : isRecommend ? 'book' : 'likes'
    router.push(`/search/${option}?query=${word}`)
  }

  const toggleMbSearch = () => {
    setIsMbSearchVisible((prev) => !prev)
  }

  useEffect(() => {
    const index = sort ? filterPath.findIndex((i) => i.includes(sort)) : 0
    setFilter(filterList[index])
  }, [filterList, filterPath, sort])

  return (
    <nav className={styles.wrapper}>
      <MobileSearchbar
        isVisible={isMbSearchVisible}
        placeholder={placeholder[pathname]}
        keyword={keyword || ''}
        onSearch={onSearch}
        onClickCancel={toggleMbSearch}
      />
      <div className={styles.menu}>
        <ul className={styles.tab}>
          <li className={isHome ? 'active' : ''}>
            <Link href="/">리뷰</Link>
          </li>
          <li className={fullPath.includes('likes') ? 'active' : ''}>
            <Link href="/likes" prefetch={false}>
              관심도서
            </Link>
          </li>
          <li className={isRecommend ? 'active' : ''}>
            <Link href="/recommend?page=1" prefetch={false}>
              추천도서
            </Link>
          </li>
          {['', 'search', 'recommend', 'likes'].includes(pathname) && (
            <li className={styles.right}>
              <ul>
                {!isRecommend && (
                  <li>
                    <Dropdown
                      initialValue={filter}
                      items={filterList}
                      keys={filterPath}
                    />
                  </li>
                )}
                <li>
                  <div
                    className={styles['mb-search-icon']}
                    onClick={toggleMbSearch}
                  >
                    <MagnifyingGlass weight="bold" size={22} />
                  </div>
                  <div className={styles.searchbar}>
                    <SearchBar
                      placeholder={placeholder[pathname]}
                      keyword={keyword || ''}
                      onSearch={onSearch}
                    />
                  </div>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
