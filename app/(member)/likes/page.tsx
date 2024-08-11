import ScrollToTopButton from '@/components/ScrollToTopButton'
import BookInfoCard from '@/components/BookInfoCard'
import { Book, BookInfoResponse, PageSearchParams } from '@/types'
import { Metadata } from 'next'
import { handleApiError, nextFetch } from '@/libs/fetch'
import { getToken } from '@/(auth)/_utils/getToken'
import Menu from '@/components/Menu/index'
import { formatBooksInfo } from '@/utils/formatBookInfo'
import { BookSort, filterBooks } from './filterBooks'

export const metadata: Metadata = {
  title: '관심도서',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function LikesPage({ searchParams }: PageSearchParams) {
  const token: string | null = await getToken()
  const { sort } = searchParams

  let filteredBooks: Book[] = []

  if (token) {
    try {
      const res = await nextFetch<BookInfoResponse[]>('api/like/list').then(
        (r) => r.body,
      )
      const books = formatBooksInfo(res)

      if (books.length > 0) filteredBooks = filterBooks(books, sort as BookSort)
    } catch (error) {
      const { status } = handleApiError(error)
      console.log(status)
    }
  }

  const message = token
    ? '관심 도서가 없어요.'
    : '로그인 후, 관심 도서를 추가해 보세요!'

  return (
    <div className="wrapper">
      <Menu />
      <h2 className="h-0">관심도서</h2>
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
