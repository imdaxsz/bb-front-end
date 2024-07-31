'use server'

import { nextFetch } from '@/libs/fetch'
import { DetailBookResponse } from '@/types'

export async function fetchBookInfo(id: string) {
  return nextFetch<DetailBookResponse>(`/api/book/detail/${id}`, {
    method: 'GET',
    next: { revalidate: 86400 },
  }).then((res) => res.body)
}

export const getIsBookLiked = async (isbn: string) => {
  const res = await nextFetch<{ isLiked: boolean }>(
    `/api/like/book/${isbn}`,
  ).then((r) => r.body)
  return res.isLiked
}

export const toggleLike = async (isbn: string) => {
  const res = nextFetch(`/api/like`, { method: 'POST', body: { isbn } }).then(
    (r) => r.body,
  )
  console.log(res)
}
