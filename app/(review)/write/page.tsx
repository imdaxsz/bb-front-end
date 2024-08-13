import { PageSearchParams, WriteMode } from '@/types'
import { Metadata } from 'next'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getToken } from '@/(auth)/_utils/getToken'
import review from '@/(review)/services'
import Editor from './Editor'

export const metadata: Metadata = {
  title: '에디터',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function WritePage({ searchParams }: PageSearchParams) {
  const mode = (searchParams.mode as string) ?? 'new'
  const logNo = (searchParams.logNo as string) ?? ''

  const token = await getToken()
  if (!token) return <></>

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['savedReviews', token],
    queryFn: review.getSavedReviews,
  })

  await queryClient.prefetchQuery({
    queryKey: ['savedReviews', token, 'count'],
    queryFn: review.getSavedReviewsCount,
  })

  const editItem = logNo ? await review.getReview(logNo) : undefined

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Editor token={token} mode={mode as WriteMode} editItem={editItem} />
    </HydrationBoundary>
  )
}
