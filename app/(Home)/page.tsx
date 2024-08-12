import Menu from '@/components/Menu/index'
import ReviewCard from '@/components/ReviewCard'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { getToken } from '@/(auth)/_utils/getToken'
import { PageSearchParams, Review } from '@/types'
import { redirect } from 'next/navigation'
import { getReviews } from '@/(review)/actions'

export default async function Home({ searchParams }: PageSearchParams) {
  const token: string | null = await getToken()
  const { sort } = searchParams

  if (sort && !['date_asc', 'title'].includes((sort as string) ?? ''))
    redirect('/')

  const message = token
    ? '아직 작성한 리뷰가 없어요.'
    : '로그인 후, 나만의 책 리뷰를 남겨보세요!'

  let reviews: Review[] = []

  if (token) {
    try {
      reviews = await getReviews(sort as string)
    } catch (error) {
      console.log('401')
    }
  }

  return (
    <div className="wrapper">
      <Menu />
      <h2 className="h-0">리뷰</h2>
      {token && reviews.length > 0 ? (
        <div className="list-wrapper">
          <ScrollToTopButton />
          <div className="list">
            {reviews.map((review) => (
              <ReviewCard review={review} key={review._id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="empty guide">
          <span>{message}</span>
        </div>
      )}
    </div>
  )
}
