import { formatBooksInfo } from '@/(book)/_utils/formatBookInfo'
import {
  Book,
  BookInfoResponse,
  DetailBookResponse,
  List,
  Review,
  SearchType,
} from '@/types'
import book from '@/(book)/services'
import review from '@/(review)/services'
import member from '@/(member)/services'

export type SearchResult =
  | List<BookInfoResponse>
  | List<Review>
  | List<DetailBookResponse>

export const search = async (
  filter: SearchType,
  keyword: string,
  page?: string,
  sort?: string,
) => {
  if (filter === 'book') return book.searchBooks(keyword, page)
  if (filter === 'review') return review.getReviews(sort, page, keyword)
  return member.getLikes(sort, page, keyword)
}

export const formatSearchResult = (
  filter: SearchType,
  result: SearchResult,
) => {
  const { totalResults, item } = result
  let items: Review[] | Book[] = []

  if (filter === 'review') items = item as Review[]
  if (filter === 'likes') items = formatBooksInfo(item as BookInfoResponse[])
  if (filter === 'book') items = formatBooksInfo(item as BookInfoResponse[])

  const totalItems = totalResults > 200 ? 200 : totalResults
  return { items, totalItems }
}
