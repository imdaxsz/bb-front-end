// import useHandleUnauthorized from '@/(auth)/_hooks/useHandleUnauthorized'
import { postReview, updateReview } from '@/(review)/actions'
import { ReviewForm } from '@/types'

export type AddReviewFunType = (
  reviewForm: ReviewForm,
  date: Date,
) => Promise<string | null>

export default function useReview() {
  // const { handleUnauthorized } = useHandleUnauthorized()

  const update = async (id: string, rating: number, text: string) => {
    if (!id) return
    try {
      await updateReview(id, rating, text)
    } catch (error) {
      console.log(error)
      // handleUnauthorized(error, 'confirm')
    }
  }

  // 후기 저장 또는 발행
  const create: AddReviewFunType = async (reviewForm, date) => {
    try {
      const { id } = await postReview(reviewForm, date, 'upload')
      return id
    } catch (error) {
      console.log(error)
      // handleUnauthorized(error, 'confirm')
    }
    return null
  }

  return { create, update }
}
