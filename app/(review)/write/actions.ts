'use server'

import { fetchExtended } from '@/lib/fetch'
import { BookList } from '@/types'

export const searchBooks = async (keyword: string) => {
  return fetchExtended<BookList>(`/api/search/book?query=${keyword}`).then(
    (res) => res.body,
  )
}
