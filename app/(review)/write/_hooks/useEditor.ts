'use client'

import { useEffect, useState } from 'react'
import { formatDate } from '@/utils/formatDate'
import { BookInfoResponse, EditorProps, ReviewForm } from '@/types'
import { useRouter } from 'next/navigation'
import bookApi from '@/(book)/services'
import { formatBooksInfo } from '@/(book)/_utils/formatBookInfo'
import useBeforeRouteChange from '@/hooks/useBeforeRouteChange'
import useTextarea from './useTextarea'
import useReview from './useReview'
import useRecommend from './useRecommend'

export type ReviewHandler = (args: Partial<ReviewForm>) => void

export default function useEditor({ editItem }: Pick<EditorProps, 'editItem'>) {
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

  const onChangeReview: ReviewHandler = (args) => {
    setReview((prev) => ({ ...prev, ...args }))
    if (args.text) setTextareaHeight()
  }

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

    // 후기 수정
    if (editItem) {
      await update(editItem?._id, review.rating, review.text)
      return
    }
    const createdId = await create(review, today)

    const result = await bookApi.getRecommendBook(categoryId)
    if (typeof result !== 'string') {
      setRecommendBook(formatBooksInfo([result as BookInfoResponse])[0])
      toggleRecommendModal()
    }

    router.push(`/review/${createdId}`)
    setIsLoading(false)
  }

  // 후기 수정 시 후기 불러오기
  useEffect(() => {
    if (!editItem) return
    const { book, text, rating, date: createdAt } = editItem
    setReview({ book, text, rating })
    setDate(formatDate(new Date(createdAt)))
  }, [editItem])

  const isContentChanged = Boolean(review.book || review.text.trim())

  useBeforeRouteChange(isContentChanged)

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
