/* eslint-disable no-use-before-define */
import type { Metadata } from 'next'
import { Book, PageSearchParams, PageURL, Review, SearchType } from '@/types'
import { notFound } from 'next/navigation'
import Pagination from '@/components/Pagination'
import ReviewCard from '@/components/ReviewCard'
import BookInfoCard from '@/components/BookInfoCard'
import Menu from '@/components/Menu/index'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { formatSearchResult, search } from '../utils'

export async function generateMetadata({
  searchParams,
}: PageSearchParams): Promise<Metadata> {
  const { query } = searchParams
  return {
    title: `'${query}' 검색 결과`,
  }
}

export default async function SearchResultPage({
  params,
  searchParams,
}: PageURL) {
  const { filter } = params
  const { sort, query, page } = searchParams
  const sortOption = (sort as string) ?? ''
  const currentPage = (page as string) ?? '1'

  if (!['book', 'review', 'likes'].includes(filter)) notFound()
  if (!['', 'title', 'date_asc'].includes(sortOption)) notFound()
  if (typeof query !== 'string') notFound()

  const res = await search(filter as SearchType, query, currentPage, sortOption)
  const { items, totalItems } = formatSearchResult(filter as SearchType, res)

  const IS_REVIEW = filter === 'review'

  return (
    <div className="wrapper">
      <Menu />
      <ScrollToTopButton />
      <div className="list-wrapper">
        <div
          className="list"
          style={{ minHeight: '50vh', marginBottom: '70px' }}
        >
          {items.length === 0 && '검색 결과가 없어요.'}
          {items.map((item) => RenderSearchResult(item, IS_REVIEW))}
        </div>
        <Pagination
          totalItems={totalItems}
          currentPage={Number(currentPage)}
          pageCount={5}
          itemCountPerPage={50}
        />
      </div>
    </div>
  )
}

function RenderSearchResult(item: Book | Review, isReview: boolean) {
  if (isReview) {
    const review = item as Review
    return <ReviewCard review={review} key={review._id} />
  }

  const book = item as Book
  return <BookInfoCard book={book} key={book.isbn} />
}
