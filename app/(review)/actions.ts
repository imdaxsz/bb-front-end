'use server'

import { nextFetch } from '@/libs/fetch'
import { Book, Review } from '@/types'
import { redirect } from 'next/navigation'

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
export const postReview = async (
  book: Book | null,
  rating: number,
  date: Date,
  text: string,
  opt: string,
) => {
  return nextFetch<{ id: string; isNewReview: boolean }>(`/api/review/new`, {
    method: 'POST',
    body: {
      book,
      rating,
      date,
      text,
      status: opt,
    },
  }).then((res) => res.body)
}

/**
 * @description 후기 목록 조회
 * @param {string} id 후기 아이디
 * @param {number} rating 별점
 * @param {string} text 후기 내용
 */
export const updateReview = async (
  id: string,
  rating: number,
  text: string,
) => {
  await nextFetch<Review>(`/api/review/${id}`, {
    method: 'PATCH',
    body: { rating, text },
  })

  redirect(`/review/${id}`)
}

/**
 * @description 리뷰 삭제
 * @param {string} id 리뷰 아이디
 */
export const deleteReview = async (id: string) => {
  return nextFetch(`/api/review/${id}`, { method: 'DELETE' })
}

/**
 * @description 후기 상세 조회
 * @param {string} id
 * @returns 후기 정보
 */
export const getSavedReviews = async () => {
  return nextFetch<Review[]>(`/api/review/saved`).then((res) => res.body)
}

/**
 * @description 임시 저장 후기 개수 조회
 * @returns 후기 개수
 */
export const getSavedReviewsCount = async () => {
  return nextFetch<{ count: number }>(`/api/review/saved/count`).then(
    (res) => res.body,
  )
}
