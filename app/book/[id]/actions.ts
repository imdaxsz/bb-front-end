'use server'

import { nextFetch } from '@/lib/fetch'

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
