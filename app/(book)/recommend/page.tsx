import BookInfoCard from '@/components/BookInfoCard'
import { Metadata } from 'next'
import Menu from '@/components/Menu/index'
import Pagination from '@/components/Pagination'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { PageSearchParams } from '@/types'
import bookApi from '../services'
import { formatBooksInfo } from '../_utils/formatBookInfo'

export const metadata: Metadata = {
  title: '추천도서',
  alternates: {
    canonical: 'https://bookbook-phi.vercel.app/recommend',
  },
}

export default async function Recommend({ searchParams }: PageSearchParams) {
  const { page } = searchParams

  const { totalResults, item } = await bookApi.getRecommendBooks(
    page ? (page as string) : '1',
  )
  const books = formatBooksInfo(item)

  return (
    <div className="wrapper">
      <Menu />
      <ScrollToTopButton />
      <h2 className="h-0">추천도서</h2>
      <div className="list-wrapper">
        <div className="list">
          {books &&
            books.map((book) => <BookInfoCard book={book} key={book.isbn} />)}
        </div>
        <Pagination
          totalItems={totalResults}
          currentPage={
            typeof page === 'string' && Number(page) > 0 ? Number(page) : 1
          }
          pageCount={5}
          itemCountPerPage={50}
        />
      </div>
    </div>
  )
}
