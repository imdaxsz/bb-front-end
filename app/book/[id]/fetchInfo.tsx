import { fetchExtended } from '@/lib/fetch'
import { DetailBookResponse } from '@/types'

export default async function fetchInfo(id: string) {
  return fetchExtended<DetailBookResponse>(`/api/book/detail/${id}`, {
    method: 'GET',
    next: { revalidate: 86400 },
  }).then((res) => res.body)
}
