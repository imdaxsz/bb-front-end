import BookInfoCard from '@/components/BookInfoCard'
import { Metadata } from 'next'
import Menu from '@/components/Menu/index'
import Pagination from '@/components/Pagination'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { nextFetch } from '@/libs/fetch'
import { BookList, PageSearchParams } from '@/types'
import { formatBooksInfo } from '@/utils/formatBookInfo'

export const metadata: Metadata = {
  title: '추천도서',
  alternates: {
    canonical: 'https://bookbook-phi.vercel.app/recommend',
  },
}

export default async function Recommend({ searchParams }: PageSearchParams) {
  const { page } = searchParams

  const { totalResults, item } = await nextFetch<BookList>(
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
      <h2 className="h-0">추천도서</h2>
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
