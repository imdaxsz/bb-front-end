'use server'

import { nextFetch } from '@/libs/fetch'
import { BookList } from '@/types'

export const searchBooks = async (keyword: string) => {
  return nextFetch<BookList>(`/api/search/book?query=${keyword}`).then(
    (res) => res.body,
  )
}
