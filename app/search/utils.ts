import { nextFetch } from '@/libs/fetch'
import { Book, BookInfoResponse, BookList, Review, SearchType } from '@/types'
import { formatBooksInfo } from '@/utils/formatBookInfo'

export type SearchResult = BookInfoResponse[] | Review[] | BookList

export const search = async (
  filter: SearchType,
  keyword: string,
  page?: string,
) => {
  if (!keyword) return []
  let url = `/api/search/${filter}?query=${keyword}`
  if (page) url += `&page=${page}`
  return nextFetch<SearchResult>(url).then((res) => res.body)
}

export const formatSearchResult = (
  filter: SearchType,
  result: SearchResult,
) => {
  let items: Review[] | Book[] = []
  if (filter === 'review') items = result as Review[]
  if (filter === 'likes') items = formatBooksInfo(result as BookInfoResponse[])
  if ('item' in result)
    items = formatBooksInfo(result.item as BookInfoResponse[])
  const totalItems = items.length > 200 ? 200 : items.length
  return { items, totalItems }
}
