import reviewApi from '@/(review)/services'
import { ReviewForm } from '@/types'
import { getClientToken } from '@/(auth)/_utils/getClientToken'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { nextRevalidatePath } from '@/utils/revalidatePath'

export default function useCreateSavedReview() {
  const queryClient = useQueryClient()
  const token = getClientToken()

  const mutation = useMutation({
    mutationFn: ({ review, date }: { review: ReviewForm; date: Date }) =>
      reviewApi.postReview(review, date, 'save'),
    onSuccess: () => {
      nextRevalidatePath('/write')
      queryClient.invalidateQueries({
        queryKey: ['savedReviews', token],
      })
      window.alert('저장 완료')
    },
  })

  const onClickSaveReview = (review: ReviewForm, date: Date) => {
    if (!review.book) {
      window.alert('리뷰를 작성할 책을 선택해주세요!')
      return
    }
    mutation.mutate({ review, date })
  }

  return { onClickSaveReview }
}
