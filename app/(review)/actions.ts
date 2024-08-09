'use server'

import { nextFetch } from '@/libs/fetch'
import { Review, ReviewForm } from '@/types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

/**
 * @description 후기 목록 조회
 * @param {string} sort 정렬
 * @returns 후기 정보
 */
export const getReviews = async (sort?: string) => {
  const url = sort ? `/api/review/list?sort=${sort}` : `/api/review/list`
  return nextFetch<Review[]>(url).then((res) => res.body)
}

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
 * @param {ReviewForm} review 후기 form
 * @param {Date} date 후기 작성 시간
 * @param {string} opt 발행 옵션 (업로드 | 임시저장)
 * @return 생성된 리뷰 아이디
 */
export const postReview = async (
  review: ReviewForm,
  date: Date,
  opt: string,
) => {
  const id = nextFetch<{ id: string }>(`/api/review/new`, {
    method: 'POST',
    body: {
      ...review,
      date,
      status: opt,
    },
  }).then((res) => res.body)

  const path = opt === 'save' ? '/write' : '/'
  revalidatePath(path)

  return id
}

/**
 * @description 후기 수정
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
export const deleteReview = async (id: string, saved?: boolean) => {
  const res = nextFetch(`/api/review/${id}`, { method: 'DELETE' })
  const path = saved ? '/write' : '/'
  revalidatePath(path)
  return res
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
