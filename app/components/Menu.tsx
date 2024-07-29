'use client'

import { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import styles from '@/styles/bar.module.scss'
import { MagnifyingGlass } from '@phosphor-icons/react'
import SearchBar from './SearchBar'

export default function Menu() {
  const fullPath = usePathname()
  const pathname = fullPath.split('/')[1]
  const [style, setStyle] = useState('')
  const filterList = useMemo(() => ['최신순', '오래된 순', '제목순'], [])
  const filterPath = useMemo(() => ['', 'sort=date_asc', 'sort=title'], [])
  const [filter, setFilter] = useState(filterList[0])
  const placeholder: Record<string, string> = {
    '': '도서명으로 후기 검색',
    likes: '제목 검색',
    recommend: '제목 검색',
  }

  const isRecommend = ['/recommend', '/search/book'].includes(fullPath)
  const isHome = ['/', '/search/review'].includes(fullPath)

  const searchParams = useSearchParams()
  const keyword = searchParams.get('query')
  const sort = searchParams.get('sort')

  const isMobile = useMediaQuery({ maxWidth: 650 })
  const [showMbSearch, setShowMbSearch] = useState(false)

  const router = useRouter()

  const onSearch = (word: string) => {
    // eslint-disable-next-line no-nested-ternary
    const option = isHome ? 'review' : isRecommend ? 'book' : 'likes'
    router.push(`/search/${option}?query=${word}`)
  }

  const selectFilter = (e: React.MouseEvent<HTMLLIElement>, i: number) => {
    e.stopPropagation()
    setFilter(filterList[i])
    setStyle('')
  }

  const onClickSearchbar = () => {
    if (isMobile) setShowMbSearch(true)
  }

  const onClickCancel = () => {
    setShowMbSearch(false)
  }

  useEffect(() => {
    const index = sort ? filterPath.findIndex((i) => i.includes(sort)) : 0
    setFilter(filterList[index])
  }, [filterList, filterPath, sort])

  return (
    <div className={styles['menu-wrapper']}>
      <div className={styles.menu}>
        {isMobile && (
          <ul
            className={`${styles['mobile-search']} ${
              showMbSearch && styles.show
            }`}
          >
            <li>
              <div className={styles['mobile-searchbar']}>
                <SearchBar
                  placeholder={placeholder[pathname]}
                  keyword={keyword || ''}
                  onSearch={onSearch}
                />
              </div>
            </li>
            <li onClick={onClickCancel}>
              <span>취소</span>
            </li>
          </ul>
        )}
        <ul className={styles.tab}>
          <li className={isHome ? 'active' : ''}>
            <Link href="/">후기</Link>
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
                    <div className="dropdown" onClick={() => setStyle('block')}>
                      <Link href="#" role="button">
                        {filter}
                      </Link>
                      <ul className={`dropdown-list ${style}`}>
                        {filterList.map((f, i) => (
                          <li
                            key={filterPath[i]}
                            onClick={(e) => selectFilter(e, i)}
                          >
                            <Link
                              href={`?${filterPath[i]}`}
                              role="button"
                              className={f === filter ? 'selected' : ''}
                            >
                              {f}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )}
                <li>
                  {isMobile ? (
                    <div
                      className={styles['mb-search-icon']}
                      onClick={onClickSearchbar}
                    >
                      <MagnifyingGlass weight="bold" size={22} />
                    </div>
                  ) : (
                    <div className={styles.searchbar}>
                      <SearchBar
                        placeholder={placeholder[pathname]}
                        keyword={keyword || ''}
                        onSearch={onSearch}
                      />
                    </div>
                  )}
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
