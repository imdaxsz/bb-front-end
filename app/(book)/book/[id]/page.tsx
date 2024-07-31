import bs from '@/styles/book.module.scss'
import styles from '@/styles/detail.module.scss'
import { formatBookDetailInfo } from '@/utils/formatBookInfo'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Menu from '@/components/Menu'
import { PageParams } from '@/types'
import fetchInfo from './fetchInfo'
import LikeButton from './_components/LikeButton'
import { getIsBookLiked } from './actions'

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const info = await fetchInfo(params.id)
  return {
    title: info.title,
  }
}

export default async function BookDetail({ params }: PageParams) {
  if (!params.id) notFound()

  const info = await fetchInfo(params.id)
  const book = formatBookDetailInfo(info)
  const isLiked = await getIsBookLiked(book.isbn)

  if (!book) notFound()

  return (
    <div className="wrapper">
      <Menu />
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <div className={styles.book}>
            <div>
              <div className={bs['img-lg']}>
                <Image fill src={book.cover} alt={book.title} />
              </div>
            </div>
            <div className={bs['detail-info']}>
              <div className={bs['detail-title']}>{book.title}</div>
              <p>저자&nbsp; {book.author}</p>
              <p>출판&nbsp; {book.publisher}</p>
              <p>출간&nbsp; {book.pubDate}</p>
              <p>분야&nbsp; {book.category.name}</p>
              <p>쪽수&nbsp; {book.itemPage}쪽</p>
            </div>
          </div>
          <div className={styles.content}>
            <div>{book.description}</div>
            <Link href={book.link} target="_blank" className={styles.link}>
              자세히 보기
            </Link>
          </div>
          <LikeButton isLiked={isLiked} isbn={book.isbn} />
        </div>
      </div>
    </div>
  )
}
