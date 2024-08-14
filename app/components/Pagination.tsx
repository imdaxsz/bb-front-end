'use client'

import { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import styles from '@/styles/pagination.module.scss'
import { useSearchParams, usePathname } from 'next/navigation'

interface Props {
  totalItems: number
  itemCountPerPage: number
  pageCount: number
  currentPage: number
}

export default function Pagination({
  totalItems,
  itemCountPerPage,
  pageCount,
  currentPage,
}: Props) {
  const [start, setStart] = useState(1)
  const totalPages = Math.ceil(totalItems / itemCountPerPage)
  const noPrev = start === 1
  const noNext = start + pageCount - 1 >= totalPages

  const searchParams = useSearchParams()
  const pathname = usePathname()

  const getUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    return `${pathname}?${params.toString()}`
  }

  // 현재 보여줄 페이지 숫자 목록
  useEffect(() => {
    if (currentPage >= start + pageCount) setStart((prev) => prev + pageCount)
    if (currentPage < start) setStart((prev) => prev - pageCount)
  }, [currentPage, pageCount, start])

  if (totalPages === 1) return <></>

  return (
    <div className={styles.wrapper}>
      <ul>
        <li className={`${styles.move} ${noPrev && styles.invisible}`}>
          <Link href={getUrl(start - 1)}>이전</Link>
        </li>
        {[...Array(pageCount)].map((_, i) => (
          <Fragment key={uuidv4()}>
            {start + i <= totalPages && (
              <li>
                <Link
                  className={`${styles.page} ${
                    currentPage === start + i && styles.active
                  }`}
                  href={getUrl(start + i)}
                >
                  {start + i}
                </Link>
              </li>
            )}
          </Fragment>
        ))}
        <li className={`${styles.move} ${noNext && styles.invisible}`}>
          <Link href={getUrl(start + pageCount)}>다음</Link>
        </li>
      </ul>
    </div>
  )
}
