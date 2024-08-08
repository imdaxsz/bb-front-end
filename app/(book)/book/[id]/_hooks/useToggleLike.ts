import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleLike } from '../actions'

export default function useToggleLike({
  isbn,
  token,
}: {
  isbn: string
  token: string | null
}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => toggleLike(isbn),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['like', isbn, token] })
      const previousIsLiked = queryClient.getQueryData(['like', isbn, token])
      queryClient.setQueryData(['like', isbn, token], !previousIsLiked)

      return { previousIsLiked }
    },
    onError: (error, variables, context) => {
      console.log(context)
      if (!context) return

      queryClient.setQueryData(['like', isbn, token], context.previousIsLiked)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['like', isbn, token] })
    },
  })
}
