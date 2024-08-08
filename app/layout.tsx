import type { Metadata } from 'next'
import '@/styles/global.scss'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import RenderTopBar from './components/RenderTopBar'
import { hasNoTopbarRoutes } from './config'
import ScrollToTop from './components/ScrollToTop'
import QueryClientProviders from './libs/providers'

export const metadata: Metadata = {
  title: {
    template: '%s | 북북',
    default: '북북 | 도서 리뷰 및 추천 서비스',
  },
  description: '도서 리뷰를 작성하고 다음에 읽을 도서를 추천받아보세요.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProviders>
          <ReactQueryDevtools />
          <ScrollToTop />
          <RenderTopBar hasNoTopbarRoutes={hasNoTopbarRoutes} />
          <main>{children}</main>
          <div id="loader" />
        </QueryClientProviders>
      </body>
    </html>
  )
}
