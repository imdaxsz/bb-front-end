import { nextFetch } from '@/libs/fetch'
import { BookInfoResponse, Review, User } from '@/types'

class MemberApi {
  async getLikes() {
    const r = await nextFetch<BookInfoResponse[]>('api/like/list')
    return r.body
  }

  async getUserInfo() {
    const res = await nextFetch<User>('/api/user/info')
    return res.body
  }

  async changePassword(currentPw: string, newPw: string) {
    return nextFetch('/api/user/change_password', {
      method: 'PATCH',
      body: { currentPw, newPw },
    })
  }

  async toggleRecommend() {
    return nextFetch('/api/recommend', { method: 'POST' })
  }

  async backUpReviews() {
    return nextFetch<Review[]>('/api/review/backup').then((res) => res.body)
  }
}

export default new MemberApi()
