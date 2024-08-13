import Menu from '@/components/Menu/index'
import ReviewCard from '@/components/ReviewCard'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { getToken } from '@/(auth)/_utils/getToken'
import { PageSearchParams, Review } from '@/types'
import { redirect } from 'next/navigation'
import reviewApi from '@/(review)/services'
import { handleApiError } from '@/libs/fetch'
import Pagination from '@/components/Pagination'

export default async function Home({ searchParams }: PageSearchParams) {
  const token: string | null = await getToken()
  const { page, sort } = searchParams
  const sortOption = (sort as string) ?? ''
  const currentPage = (page as string) ?? '1'

  if (sort && !['date_asc', 'title'].includes(sortOption)) redirect('/')

  const message = token
    ? '아직 작성한 리뷰가 없어요.'
    : '로그인 후, 나만의 책 리뷰를 남겨보세요!'

  let reviews: Review[] = []
  let totalReviews = 0

  if (token) {
    try {
      const { item, totalResults } = await reviewApi.getReviews(
        sortOption,
        currentPage,
      )
      reviews = item
      totalReviews = totalResults
    } catch (error) {
      const { status } = handleApiError(error)
      if (status === 401) redirect('/signout')
    }
  }

  return (
    <div className="wrapper">
      <Menu />
      <h2 className="h-0">리뷰</h2>
      {token && totalReviews > 0 ? (
        <div className="list-wrapper">
          <ScrollToTopButton />
          <div className="list">
            {reviews.map((review) => (
              <ReviewCard review={review} key={review._id} />
            ))}
          </div>
          <Pagination
            totalItems={totalReviews}
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
