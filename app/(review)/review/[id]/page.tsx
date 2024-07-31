import ReviewBookInfo from '@/components/ReviewBookInfo'
import styles from '@/styles/detail.module.scss'
import { PageParams } from '@/types'
import { notFound } from 'next/navigation'
import { formatDate } from '@/utils/formatDate'
import type { Metadata } from 'next'
import Tools from './_components/Tools'
import { getReview } from './actions'

export const metadata: Metadata = {
  title: '후기',
}

export default async function ReviewDetail({ params }: PageParams) {
  const { id } = params
  if (!id) notFound()

  const review = await getReview(id)

  if (!review) notFound()

  const date = formatDate(new Date(review.date))

  return (
    <div className="wrapper">
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <Tools id={id} />
          <div className={styles.book}>
            <ReviewBookInfo book={review.book} rating={review.rating} />
          </div>
          <div className={styles.content}>
            <div>{date}</div>
            <div>{review.text}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
