import useHandleUnauthorized from '@/(auth)/_hooks/useHandleUnauthorized'
import { ReviewForm } from '@/types'
import review from '@/(review)/services'
import { useRouter } from 'next/navigation'
import { nextRevalidatePath } from '@/utils/revalidatePath'

export type AddReviewFunType = (
  reviewForm: ReviewForm,
  date: Date,
) => Promise<string | null>

export default function useReview() {
  const router = useRouter()

  const { handleUnauthorized } = useHandleUnauthorized()

  const update = async (id: string, rating: number, text: string) => {
    if (!id) return
    try {
      await review.updateReview(id, rating, text)
      router.push(`/review/${id}`)
      router.refresh()
    } catch (error) {
      handleUnauthorized(error, 'confirm')
    }
  }

  // 후기 발행
  const create: AddReviewFunType = async (reviewForm, date) => {
    try {
      const { id } = await review.postReview(reviewForm, date, 'upload')
      nextRevalidatePath('/')
      return id
    } catch (error) {
      handleUnauthorized(error, 'confirm')
    }
    return null
  }

  return { create, update }
}
