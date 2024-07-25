'use client'

import { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import styles from '@/styles/pagination.module.scss'

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
  const [url, setUrl] = useState('')
  const [start, setStart] = useState(1)
  const totalPages = Math.ceil(totalItems / itemCountPerPage)
  const noPrev = start === 1
  const noNext = start + pageCount - 1 >= totalPages

  useEffect(() => {
    const currentUrl = window.location.href
    if (currentUrl.includes('query') && url.includes('page'))
      setUrl(currentUrl.split('page')[0])
    else if (currentUrl.includes('query')) setUrl(`${currentUrl}&`)
    else setUrl(`${currentUrl.split('?')[0]}?`)
  }, [url])

  useEffect(() => {
    if (currentPage >= start + pageCount) setStart((prev) => prev + pageCount)
    if (currentPage < start) setStart((prev) => prev - pageCount)
  }, [currentPage, pageCount, start])

  return (
    <div className={styles.wrapper}>
      <ul>
        <li className={`${styles.move} ${noPrev && styles.invisible}`}>
          <Link href={`${url}page=${start - 1}`}>이전</Link>
        </li>
        {[...Array(pageCount)].map((_, i) => (
          <Fragment key={uuidv4()}>
            {start + i <= totalPages && (
              <li>
                <Link
                  className={`${styles.page} ${
                    currentPage === start + i && styles.active
                  }`}
                  href={`${url}page=${start + i}`}
                >
                  {start + i}
                </Link>
              </li>
            )}
          </Fragment>
        ))}
        <li className={`${styles.move} ${noNext && styles.invisible}`}>
          <Link href={`${url}page=${start + pageCount}`}>다음</Link>
        </li>
      </ul>
    </div>
  )
}
