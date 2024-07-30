'use server'

import { nextFetch } from '@/lib/fetch'
import { Review } from '@/types'

export const changePassword = (currentPw: string, newPw: string) => {
  return nextFetch('/api/user/change_password', {
    method: 'PATCH',
    body: { currentPw, newPw },
  })
}

export const toggleRecommend = async () => {
  return nextFetch('/api/recommend', { method: 'POST' })
}

export const backUpReviews = () => {
  return nextFetch<Review[]>('/api/review/backup')
}
