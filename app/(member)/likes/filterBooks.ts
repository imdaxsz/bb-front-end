import { Book } from '@/types'

export type BookSort = 'date_asc' | 'title'

export const filterBooks = (books: Book[], sort?: BookSort) => {
  if (sort === 'date_asc') {
    return books.reverse()
  }
  if (sort === 'title') {
    const result = [...books].sort((a, b) => a.title.localeCompare(b.title))
    return result
  }
  return books
}
