'use client'

import { useCallback, useEffect, useState } from 'react'
import { formatDate } from '@/utils/formatDate'
import { BookInfoResponse, ReviewForm, WriteMode } from '@/types'
import { getReview } from '@/(review)/actions'
import { useRouter } from 'next/navigation'
import { formatBooksInfo } from '@/utils/formatBookInfo'
import useTextarea from './useTextarea'
import useReview from './useReview'
import { getRecommendBook } from '../actions'
import useRecommend from './useRecommend'

export type ReviewHandler = (args: Partial<ReviewForm>) => void

interface EditorProps {
  id?: string
  mode?: WriteMode
}
export default function useEditor({ id, mode }: EditorProps) {
  const InitialReview: ReviewForm = {
    book: null,
    text: '',
    rating: 3,
  }
  const today = new Date()
  const [review, setReview] = useState<ReviewForm>(InitialReview)
  const [date, setDate] = useState(formatDate(today))

  const [isLoading, setIsLoading] = useState(false)

  const { textareaRef, setTextareaHeight } = useTextarea()
  const { create, update } = useReview()

  const router = useRouter()

  const { categoryId, setRecommendBook, toggleRecommendModal } = useRecommend()

  // 후기 수정 시 후기 불러오기
  const loadReview = useCallback(async (reviewId: string) => {
    setIsLoading(true)
    try {
      const { book, rating, text, date: createdAt } = await getReview(reviewId)
      setReview({ book, text, rating })
      setDate(formatDate(new Date(createdAt)))
    } catch (error) {
      // handleUnauthorized(error)
    }
    setIsLoading(false)
  }, [])

  // 후기 발행
  const onSubmit = async () => {
    if (!review.book) {
      window.alert('리뷰를 작성할 책을 선택해주세요!')
      return
    }
    if (review.text.trim() === '') {
      window.alert('리뷰 내용을 입력해주세요!')
      return
    }
    setIsLoading(true)
    if (mode === 'edit') {
      if (!id) return
      await update(id, review.rating, review.text)
      return
    }
    const createdId = await create(review, today)

    const result = await getRecommendBook(categoryId)
    if (typeof result !== 'string') {
      setRecommendBook(formatBooksInfo([result as BookInfoResponse])[0])
      toggleRecommendModal()
    }

    router.push(`/review/${createdId}`)
    setIsLoading(false)
  }

  useEffect(() => {
    if (mode === 'edit' && id) loadReview(id)
  }, [mode, loadReview, id])

  const onChangeReview: ReviewHandler = (args) => {
    setReview((prev) => ({ ...prev, ...args }))
    if (args.text) setTextareaHeight()
  }

  return {
    isLoading,
    today,
    date,
    review,
    onChangeReview,
    textareaRef,
    onSubmit,
  }
}
