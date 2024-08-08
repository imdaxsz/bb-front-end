import { useQuery } from '@tanstack/react-query'
import { getIsBookLiked } from '../actions'

export default function useGetIsLiked({
  isbn,
  token,
}: {
  isbn: string
  token: string | null
}) {
  const { data } = useQuery({
    queryKey: ['like', isbn, token],
    queryFn: () => getIsBookLiked(isbn),
    enabled: Boolean(token),
  })

  return data
}
