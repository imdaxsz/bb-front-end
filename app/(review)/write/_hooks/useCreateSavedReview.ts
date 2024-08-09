import { postReview } from '@/(review)/actions'
import { ReviewForm } from '@/types'
import { getClientToken } from '@/(auth)/_utils/getClientToken'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useCreateSavedReview() {
  const queryClient = useQueryClient()
  const token = getClientToken()

  const mutation = useMutation({
    mutationFn: ({ review, date }: { review: ReviewForm; date: Date }) =>
      postReview(review, date, 'save'),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['savedReviews', token],
      })
      window.alert('저장 완료')
    },
  })

  const onClickSaveReview = (review: ReviewForm, date: Date) => {
    if (!review.book) {
      window.alert('후기를 작성할 책을 선택해주세요!')
      return
    }
    mutation.mutate({ review, date })
  }

  return { onClickSaveReview }
}
