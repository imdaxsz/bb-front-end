'use client'

import { useCallback, useEffect, useState } from 'react'
import { formatDate } from '@/utils/formatDate'
import { ReviewForm, WriteMode } from '@/types'
import { getReview } from '@/(review)/actions'
import { useRouter } from 'next/navigation'
import useTextarea from './useTextarea'
import useReview from './useReview'

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
  const { create, update, savedCount } = useReview()

  const router = useRouter()

  // 후기 수정 시 후기 불러오기
  const loadReview = useCallback(async (reviewId: string) => {
    setIsLoading(true)
    const { book, rating, text, date: createdAt } = await getReview(reviewId)
    setReview({ book, text, rating })
    setDate(formatDate(new Date(createdAt)))
    setIsLoading(false)
  }, [])

  const onSubmit = async (opt: 'save' | 'upload') => {
    if (!review.book) {
      window.alert('후기를 작성할 책을 선택해주세요!')
      return
    }
    if (opt === 'upload' && review.text.trim() === '') {
      window.alert('후기 내용을 입력해주세요!')
      return
    }
    setIsLoading(true)
    if (mode === 'edit') {
      if (!id) return
      await update(id, review.rating, review.text)
      return
    }
    const createdId = await create(review, today, opt)
    if (createdId && opt === 'upload') {
      console.log('추천 모달 생성')
    }
    if (opt === 'upload') router.push(`/review/${createdId}`)
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
    savedCount,
    date,
    review,
    onChangeReview,
    textareaRef,
    onSubmit,
  }
}
