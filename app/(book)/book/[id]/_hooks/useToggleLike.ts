import { useMutation, useQueryClient } from '@tanstack/react-query'
import book from '@/(book)/services'
import { nextRevalidatePath } from '@/utils/revalidatePath'
import useHandleUnauthorized from '@/(auth)/_hooks/useHandleUnauthorized'

export default function useToggleLike({
  isbn,
  token,
}: {
  isbn: string
  token: string | null
}) {
  const queryClient = useQueryClient()
  const { handleUnauthorized } = useHandleUnauthorized()

  return useMutation({
    mutationFn: () => book.toggleLike(isbn),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['like', isbn, token] })
      const previousIsLiked = queryClient.getQueryData(['like', isbn, token])
      queryClient.setQueryData(['like', isbn, token], !previousIsLiked)

      return { previousIsLiked }
    },
    onSuccess: () => {
      nextRevalidatePath('/likes')
    },
    onError: (error, variables, context) => {
      if (!context) return

      queryClient.setQueryData(['like', isbn, token], context.previousIsLiked)
      handleUnauthorized(error, 'confirm')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['like', isbn, token] })
    },
  })
}
