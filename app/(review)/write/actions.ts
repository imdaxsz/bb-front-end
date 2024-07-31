'use server'

import { nextFetch } from '@/libs/fetch'
import { BookList, Review } from '@/types'

export const searchBooks = async (keyword: string) => {
  return nextFetch<BookList>(`/api/search/book?query=${keyword}`).then(
    (res) => res.body,
  )
}

export const getSavedReviews = async () => {
  return nextFetch<Review[]>(`/api/review/saved`).then((res) => res.body)
}
