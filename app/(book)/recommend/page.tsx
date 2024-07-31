import BookInfoCard from '@/components/BookInfoCard'
import { Metadata } from 'next'
import Menu from '@/components/Menu'
import Pagination from '@/components/Pagination'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { fetchExtended } from '@/lib/fetch'
import { BookList, PageSearchParams } from '@/types'
import { formatBooksInfo } from '@/utils/formatBookInfo'

export const metadata: Metadata = {
  title: '추천도서',
}

export default async function Recommend({ searchParams }: PageSearchParams) {
  const { page } = searchParams

  const { totalResults, item } = await fetchExtended<BookList>(
    `/api/book/recommend?page=${page}`,
    {
      method: 'GET',
      next: { revalidate: 86400 }, // 하루 단위 재검증
    },
  ).then((res) => res.body)
  const books = formatBooksInfo(item)

  return (
    <div className="wrapper">
      <Menu />
      <ScrollToTopButton />
      <div className="list-wrapper">
        <div className="list" style={{ marginBottom: '70px' }}>
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
