import ScrollToTopButton from '@/components/ScrollToTopButton'
import BookInfoCard from '@/components/BookInfoCard'
import { Book, PageSearchParams } from '@/types'
import { Metadata } from 'next'
import { handleApiError } from '@/libs/fetch'
import { getToken } from '@/(auth)/_utils/getToken'
import member from '@/(member)/services'
import Menu from '@/components/Menu/index'
import { formatBooksInfo } from '@/utils/formatBookInfo'
import { redirect } from 'next/navigation'
import Pagination from '@/components/Pagination'

export const metadata: Metadata = {
  title: '관심도서',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function LikesPage({ searchParams }: PageSearchParams) {
  const token: string | null = await getToken()

  const { page, sort } = searchParams
  const sortOption = (sort as string) ?? ''
  const currentPage = (page as string) ?? '1'

  let books: Book[] = []
  let totalLikes = 0

  if (token) {
    try {
      const { item, totalResults } = await member.getLikes(
        sortOption,
        currentPage,
      )
      books = formatBooksInfo(item)
      totalLikes = totalResults
    } catch (error) {
      const { status } = handleApiError(error)
      if (status === 401) redirect('/signout')
    }
  }

  const message = token
    ? '관심 도서가 없어요.'
    : '로그인 후, 관심 도서를 추가해 보세요!'

  return (
    <div className="wrapper">
      <Menu />
      <h2 className="h-0">관심도서</h2>
      {token && books.length > 0 ? (
        <div className="list-wrapper">
          <ScrollToTopButton />
          <div className="list">
            {books.map((book) => (
              <BookInfoCard book={book} key={book.isbn} />
            ))}
          </div>
          <Pagination
            totalItems={totalLikes}
            currentPage={Number(currentPage)}
            pageCount={5}
            itemCountPerPage={20}
          />
        </div>
      ) : (
        <div className="empty guide">
          <span>{message}</span>
        </div>
      )}
    </div>
  )
}
