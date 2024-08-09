import { getClientToken } from '@/(auth)/_utils/getClientToken'
import { deleteReview } from '@/(review)/actions'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useDeleteSavedReview() {
  const queryClient = useQueryClient()
  const token = getClientToken()

  return useMutation({
    mutationFn: (id: string) => deleteReview(id, true),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['savedReviews', token],
      })
    },
  })
}
