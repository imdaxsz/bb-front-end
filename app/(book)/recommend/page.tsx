import { Metadata } from 'next'
import Menu from '@/components/Menu/index'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { PageSearchParams } from '@/types'
import { Suspense } from 'react'
import ListSkeleton from '../ListSkeleton'
import BookList from './BookList'

export const metadata: Metadata = {
  title: '추천도서',
  alternates: {
    canonical: 'https://bookbook-phi.vercel.app/recommend',
  },
}

export default async function Recommend({ searchParams }: PageSearchParams) {
  const { page } = searchParams

  return (
    <div className="wrapper">
      <Menu />
      <ScrollToTopButton />
      <h2 className="h-0">추천도서</h2>
      <Suspense fallback={<ListSkeleton />}>
        <BookList page={page ? (page as string) : '1'} />
      </Suspense>
    </div>
  )
}
