import BookInfoCard from '@/components/BookInfoCard'
import Pagination from '@/components/Pagination'
import { formatBooksInfo } from '../_utils/formatBookInfo'
import bookApi from '../services'

export default async function BookList({ page }: { page: string }) {
  const { totalResults, item } = await bookApi.getRecommendBooks(page)
  const books = formatBooksInfo(item)

  return (
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
  )
}
