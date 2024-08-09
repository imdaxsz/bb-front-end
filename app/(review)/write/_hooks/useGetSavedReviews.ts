import { getSavedReviews, getSavedReviewsCount } from '@/(review)/actions'
import { useSuspenseQueries } from '@tanstack/react-query'

export default function useGetSavedReviews(token: string) {
  const [{ data }, { data: reviewCount }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['savedReviews', token],
        queryFn: getSavedReviews,
      },
      {
        queryKey: ['savedReviews', token, 'count'],
        queryFn: getSavedReviewsCount,
      },
    ],
  })

  const savedReviewCount = reviewCount ? reviewCount.count : 0

  return {
    data,
    savedReviewCount,
  }
}
