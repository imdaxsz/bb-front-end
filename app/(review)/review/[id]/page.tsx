import ReviewBookInfo from '@/components/ReviewBookInfo'
import styles from '@/styles/detail.module.scss'
import { PageParams } from '@/types'
import { notFound } from 'next/navigation'
import { formatDate } from '@/utils/formatDate'
import type { Metadata } from 'next'
import RecommendModal from '@/(review)/write/_components/RecommendModal'
import Tools from './_components/Tools'
import { getReview } from '../../actions'

export const metadata: Metadata = {
  title: '후기',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function ReviewDetail({ params }: PageParams) {
  const { id } = params
  if (!id) notFound()

  const review = await getReview(id)

  if (!review) notFound()

  const date = formatDate(new Date(review.date))

  return (
    <div className="wrapper">
      <RecommendModal />
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <Tools id={id} />
          <div className={styles.book}>
            <ReviewBookInfo book={review.book} rating={review.rating} />
          </div>
          <div className={styles.content}>
            <p className={styles.date}>{date}</p>
            <p>{review.text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
