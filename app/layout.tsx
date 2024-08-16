import type { Metadata } from 'next'
import '@/styles/global.scss'
import RenderTopBar from './components/RenderTopBar'
import { hasNoTopbarRoutes } from './config'
import ScrollToTop from './components/ScrollToTop'
import QueryClientProviders from './libs/providers'
import { baseMetadata } from './config/metadata'

export const metadata: Metadata = baseMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProviders>
          <ScrollToTop />
          <RenderTopBar hasNoTopbarRoutes={hasNoTopbarRoutes} />
          <main>{children}</main>
          <div id="loader" />
        </QueryClientProviders>
      </body>
    </html>
  )
}
