import { useMutation, useQueryClient } from '@tanstack/react-query'
import book from '@/(book)/services'
import { nextRevalidatePath } from '@/utils/revalidatePath'
import useHandleUnauthorized from '@/(auth)/_hooks/useHandleUnauthorized'

export interface LikeProps {
  token: string | null
  isbn: string
  title: string
}

export default function useToggleLike({ isbn, title, token }: LikeProps) {
  const queryClient = useQueryClient()
  const { handleUnauthorized } = useHandleUnauthorized()

  return useMutation({
    mutationFn: () => book.toggleLike(isbn, title),
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
