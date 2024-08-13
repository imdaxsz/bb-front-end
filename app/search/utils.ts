import { formatBooksInfo } from '@/(book)/_utils/formatBookInfo'
import { nextFetch } from '@/libs/fetch'
import {
  Book,
  BookInfoResponse,
  DetailBookResponse,
  List,
  Review,
  SearchType,
} from '@/types'

export type SearchResult =
  | BookInfoResponse[]
  | Review[]
  | List<DetailBookResponse>

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
