import { handleUnauthorized } from '@/(auth)/_utils/handleUnauthorized'
import {
  getSavedReviewsCount,
  postReview,
  updateReview,
} from '@/(review)/actions'
import { ReviewForm } from '@/types'
import { useEffect, useState } from 'react'

export type AddReviewFunType = (
  reviewForm: ReviewForm,
  date: Date,
  opt: 'save' | 'upload',
) => Promise<string>

export default function useReview() {
  const [savedCount, setSavedCount] = useState(0)

  const update = async (id: string, rating: number, text: string) => {
    if (!id) return
    try {
      await updateReview(id, rating, text)
    } catch (error) {
      console.log(error)
      handleUnauthorized(error, 'confirm')
    }
  }

  // 후기 저장 또는 발행
  const create: AddReviewFunType = async (reviewForm, date, opt) => {
    let reviewId = ''
    const { book, rating, text } = reviewForm

    try {
      const { id } = await postReview(book, rating, date, text, opt)
      if (opt === 'save') {
        // 임시 저장
        window.alert('저장 완료')
        // TODO: 임시 저장 개수 UPDATE
        // if (isNewReview) dispatch(setCount(savedCount + 1)) // 임시 저장에 없는 후기일 경우에만 개수 증가
      } else reviewId = id
    } catch (error) {
      console.log(error)
      handleUnauthorized(error)
    }
    return reviewId
  }

  const fetchSavedReviewCount = async () => {
    const { count } = await getSavedReviewsCount()
    setSavedCount(count)
  }

  useEffect(() => {
    fetchSavedReviewCount()
  }, [])

  return { create, update, savedCount }
}
