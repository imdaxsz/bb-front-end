import type { Metadata } from 'next'
import '@/styles/global.scss'
import TopBar from './components/TopBar'
import StoreProvider from './store/provider'

export const metadata: Metadata = {
  title: {
    template: '%s | 북북',
    default: '북북 | 도서 리뷰 및 추천 서비스',
  },
  description: '도서 리뷰를 작성하고 다음에 읽을 도서를 추천받아보세요.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <TopBar />
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  )
}
