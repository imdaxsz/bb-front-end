'use server'

import { nextFetch } from '@/libs/fetch'
import { BookInfoResponse, BookList } from '@/types'

export const searchBooks = async (keyword: string) => {
  return nextFetch<BookList>(`/api/search/book?query=${keyword}`).then(
    (res) => res.body,
  )
}

/**
 * @description 도서 추천 요청
 * @param {string} categoryId
 * @returns 추천 도서 정보
 */
export const getRecommendBook = async (categoryId: string) => {
  return nextFetch<BookInfoResponse | string>(`/api/recommend/foryou`, {
    method: 'POST',
    body: { categoryId },
  }).then((res) => res.body)
}
