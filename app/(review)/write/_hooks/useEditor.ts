'use client'

import { useCallback, useEffect, useState } from 'react'
import { formatDate } from '@/utils/formatDate'
import { Book, WriteMode } from '@/types'
import { getReview } from '@/(review)/actions'
import useTextarea from './useTextarea'

export interface ReviewForm {
  book: Book | null
  rating: number
  text: string
}

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
  const [review, setReview] = useState<ReviewForm>(InitialReview)
  const [date, setDate] = useState(formatDate(new Date()))
  const [isLoading, setIsLoading] = useState(false)

  const { textareaRef, setTextareaHeight } = useTextarea()

  // 후기 수정 시 후기 불러오기
  const loadReview = useCallback(async (reviewId: string) => {
    setIsLoading(true)
    const { book, rating, text, date: createdAt } = await getReview(reviewId)
    setReview({ book, text, rating })
    setDate(formatDate(new Date(createdAt)))
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (mode === 'edit' && id) loadReview(id)
  }, [mode, loadReview, id])

  const onChangeReview: ReviewHandler = (args) => {
    setReview((prev) => ({ ...prev, ...args }))
    if (args.text) setTextareaHeight()
  }

  return { isLoading, date, review, onChangeReview, textareaRef }
}
