import { nextFetch } from '@/libs/fetch'
import { List, Review, ReviewForm } from '@/types'

class ReviewApi {
  /**
   * @description 후기 목록 조회
   * @param {string} sort 정렬
   * @returns 후기 정보
   */
  async getReviews(sort?: string, page?: string, keyword?: string) {
    const query = `sort=${sort}&page=${page}&keyword=${keyword}`
    const url = `/api/review/list?${query}`
    return nextFetch<List<Review>>(url).then((res) => res.body)
  }

  /**
   * @description 후기 상세 조회
   * @param {string} id
   * @returns 후기 정보
   */
  async getReview(id: string) {
    return nextFetch<Review>(`/api/review/detail/${id}`).then((res) => res.body)
  }

  // async searchReview(keyword: string) {
  //   return nextFetch<Review[]>(`/api/search/review?query=${keyword}`).then(
  //     (res) => res.body,
  //   )
  // }

  /**
   * @description 임시 저장 리뷰 목록 조회
   */
  async getSavedReviews() {
    return nextFetch<Review[]>(`/api/review/saved`).then((res) => res.body)
  }

  /**
   * @description 임시 저장 후기 개수 조회
   */
  async getSavedReviewsCount() {
    return nextFetch<{ count: number }>(`/api/review/saved/count`).then(
      (res) => res.body,
    )
  }

  async postReview(review: ReviewForm, date: Date, opt: string) {
    return nextFetch<{ id: string }>(`/api/review/new`, {
      method: 'POST',
      body: {
        ...review,
        date,
        status: opt,
      },
    }).then((res) => res.body)
  }

  /**
   * @description 후기 수정
   * @param {string} id 후기 아이디
   * @param {number} rating 별점
   * @param {string} text 후기 내용
   */
  async updateReview(id: string, rating: number, text: string) {
    return nextFetch<Review>(`/api/review/${id}`, {
      method: 'PATCH',
      body: { rating, text },
    })
  }

  /**
   * @description 리뷰 삭제
   * @param {string} id 리뷰 아이디
   */
  async deleteReview(id: string) {
    return nextFetch(`/api/review/${id}`, { method: 'DELETE' })
  }
}

export default new ReviewApi()
