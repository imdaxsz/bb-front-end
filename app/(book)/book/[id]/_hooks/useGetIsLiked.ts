import { useQuery } from '@tanstack/react-query'
import book from '@/(book)/services'

export default function useGetIsLiked({
  isbn,
  token,
}: {
  isbn: string
  token: string | null
}) {
  const { data, error } = useQuery({
    queryKey: ['like', isbn, token],
    queryFn: () => book.getIsBookLiked(isbn),
    enabled: Boolean(token),
  })

  if (error) return false

  return data
}
