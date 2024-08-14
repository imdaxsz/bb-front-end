import { nextFetch } from '@/libs/fetch'
import { BookInfoResponse, List, Review, User } from '@/types'

class MemberApi {
  async getLikes(sort?: string, page?: string, keyword?: string) {
    const query = `sort=${sort}&page=${page}&keyword=${keyword}`
    const url = `/api/like/list?${query}`
    return nextFetch<List<BookInfoResponse>>(url).then((res) => res.body)
  }

  async getUserInfo() {
    return nextFetch<User>('/api/user/info').then((res) => res.body)
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
