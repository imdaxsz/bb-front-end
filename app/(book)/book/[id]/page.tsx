import bs from '@/styles/book.module.scss'
import styles from '@/styles/detail.module.scss'
import { formatBookDetailInfo } from '@/utils/formatBookInfo'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Menu from '@/components/Menu/index'
import { PageParams } from '@/types'
import { getToken } from '@/(auth)/_utils/getToken'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import LikeButton from './_components/LikeButton'
import { fetchBookInfo, getIsBookLiked } from './actions'

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const info = await fetchBookInfo(params.id)
  return {
    title: info.title,
    robots: {
      index: true,
      follow: false,
    },
    openGraph: {
      images: {
        url: info.cover,
      },
    },
    twitter: {
      images: {
        url: info.cover,
      },
    },
  }
}

export default async function BookDetail({ params }: PageParams) {
  if (!params.id) notFound()

  const info = await fetchBookInfo(params.id)
  const book = formatBookDetailInfo(info)
  const token = await getToken()

  if (!book) notFound()

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['like', book.isbn, token],
    queryFn: () => getIsBookLiked(book.isbn),
  })

  return (
    <div className="wrapper">
      <Menu />
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <div className={styles.book}>
            <div>
              <div className={bs['img-lg']}>
                <Image fill sizes="100%" src={book.cover} alt={book.title} />
              </div>
            </div>
            <div className={bs['detail-info']}>
              <h2 className={bs.title}>{book.title}</h2>
              <p>저자&nbsp; {book.author}</p>
              <p>출판&nbsp; {book.publisher}</p>
              <p>출간&nbsp; {book.pubDate}</p>
              <p>분야&nbsp; {book.category.name}</p>
              <p>쪽수&nbsp; {book.itemPage}쪽</p>
            </div>
          </div>
          <div className={styles.content}>
            <p className={styles.info}>{book.description}</p>
            <Link href={book.link} target="_blank" className={styles.link}>
              자세히 보기
            </Link>
          </div>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <LikeButton token={token} isbn={book.isbn} />
          </HydrationBoundary>
        </div>
      </div>
    </div>
  )
}
