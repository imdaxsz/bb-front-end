import ScrollToTopButton from '@/components/ScrollToTopButton'
import BookInfoCard from '@/components/BookInfoCard'
import { Book, BookInfoResponse, PageSearchParams } from '@/types'
import { Metadata } from 'next'
import { nextFetch } from '@/libs/fetch'
import { getToken } from '@/(auth)/_utils/getToken'
import Menu from '@/components/Menu'
import { formatBooksInfo } from '@/utils/formatBookInfo'
import { BookSort, filterBooks } from './filterBooks'

export const metadata: Metadata = {
  title: '관심도서',
}

export default async function LikesPage({ searchParams }: PageSearchParams) {
  const token: string | null = await getToken()
  const { sort } = searchParams

  let filteredBooks: Book[] = []

  if (token) {
    const res = await nextFetch<BookInfoResponse[]>('api/like/list').then(
      (r) => r.body,
    )
    const books = formatBooksInfo(res)

    if (books.length > 0) filteredBooks = filterBooks(books, sort as BookSort)
  }

  const message = token
    ? '관심 도서가 없어요.'
    : '로그인 후, 관심 도서를 추가해 보세요!'

  return (
    <div className="wrapper">
      <Menu />
      {token && filteredBooks.length > 0 ? (
        <div className="list-wrapper">
          <ScrollToTopButton />
          <div className="list">
            {filteredBooks.map((book) => (
              <BookInfoCard book={book} key={book.isbn} />
            ))}
          </div>
        </div>
      ) : (
        <div className="guide">
          <span>{message}</span>
        </div>
      )}
    </div>
  )
}
