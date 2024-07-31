'use server'

import { nextFetch } from '@/libs/fetch'
import { Book, Review } from '@/types'

/**
 * @description 후기 상세 조회
 * @param {string} id
 * @returns 후기 정보
 */
export const getReview = async (id: string) => {
  return nextFetch<Review>(`/api/review/detail/${id}`).then((res) => res.body)
}

/**
 * @description 새로운 후기 작성 또는 저장
 * @param {Book | null} book 도서 정보
 * @param {number} rating 별점
 * @param {Date} date 후기 작성 시간
 * @param {string} text 후기 내용
 * @param {string} opt 발행 옵션 (업로드 | 임시저장)
 * @return 생성된 리뷰 아이디
 */
export const postReview = (
  book: Book | null,
  rating: number,
  date: Date,
  text: string,
  opt: string,
) => {
  return nextFetch(`/api/review/new`, {
    method: 'POST',
    body: {
      book,
      rating,
      date,
      text,
      status: opt,
    },
  })
}

export const deleteReview = async (id: string) => {
  return nextFetch(`/api/review/${id}`, { method: 'DELETE' })
}
