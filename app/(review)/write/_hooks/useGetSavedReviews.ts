import { useSuspenseQueries } from '@tanstack/react-query'
import review from '@/(review)/services'

export default function useGetSavedReviews(token: string) {
  const [{ data }, { data: reviewCount }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['savedReviews', token],
        queryFn: review.getSavedReviews,
      },
      {
        queryKey: ['savedReviews', token, 'count'],
        queryFn: review.getSavedReviewsCount,
      },
    ],
  })

  const savedReviewCount = reviewCount ? reviewCount.count : 0

  return {
    data,
    savedReviewCount,
  }
}
