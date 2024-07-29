import Menu from '@/components/Menu'
import ReviewCard from '@/components/ReviewCard'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { nextFetch } from '@/lib/fetch'
import { getToken } from '@/(auth)/_utils/getToken'
import { Review } from '@/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '홈',
}

export default async function Home() {
  const token: string | null = await getToken()

  const message = token
    ? '아직 작성한 후기가 없어요.'
    : '로그인 후, 나만의 책 후기를 남겨보세요!'

  let reviews: Review[] = []

  if (token)
    reviews = await nextFetch<Review[]>('/api/review/list').then(
      (res) => res.body,
    )

  return (
    <div className="wrapper">
      <Menu />
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
        <div className="guide">
          <span>{message}</span>
        </div>
      )}
    </div>
  )
}
