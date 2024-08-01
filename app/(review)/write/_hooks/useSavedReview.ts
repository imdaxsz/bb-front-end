import { deleteReview, getSavedReviews } from '@/(review)/actions'
import { Review } from '@/types'
import { useState, useCallback, useEffect } from 'react'
import { handleUnauthorized } from '@/(auth)/_utils/handleUnauthorized'

export default function useSavedReview() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)

  const fetchSavedReviews = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getSavedReviews()
      setReviews(res)
    } catch (error) {
      handleUnauthorized(error)
      // handleUnauthorizated(error)
    }
    setLoading(false)
    // if (setWriteLoading) setWriteLoading(false)
  }, [])

  const deleteSavedReview = async (i: number) => {
    try {
      await deleteReview(reviews[i]._id)
      const newReviews = reviews.filter((a) => a._id !== reviews[i]._id)
      setReviews(newReviews)
      // dispatch(setCount(count - 1))
    } catch (error) {
      console.log(error)
      handleUnauthorized(error, 'confirm')
    }
  }

  useEffect(() => {
    fetchSavedReviews()
  }, [fetchSavedReviews])

  return {
    savedReviews: reviews,
    setReviews,
    fetchSavedReviews,
    deleteSavedReview,
    loading,
    setLoading,
  }
}
