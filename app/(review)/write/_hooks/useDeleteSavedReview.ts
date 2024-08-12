import { getClientToken } from '@/(auth)/_utils/getClientToken'
import { nextRevalidatePath } from '@/utils/revalidatePath'
import review from '@/(review)/services'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useDeleteSavedReview() {
  const queryClient = useQueryClient()
  const token = getClientToken()

  return useMutation({
    mutationFn: (id: string) => review.deleteReview(id),
    onSuccess: () => {
      nextRevalidatePath('/write')
      queryClient.invalidateQueries({
        queryKey: ['savedReviews', token],
      })
    },
  })
}
