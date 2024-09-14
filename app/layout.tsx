/* eslint-disable react/no-danger */
import type { Metadata, Viewport } from 'next'
import '@/styles/global.scss'
import RenderTopBar from './components/RenderTopBar'
import { hasNoTopbarRoutes } from './config'
import ScrollToTop from './components/ScrollToTop'
import QueryClientProviders from './libs/providers'
import { baseMetadata } from './config/metadata'

export const metadata: Metadata = baseMetadata

export const viewport: Viewport = {
  viewportFit: 'cover',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '북북',
  description: baseMetadata.description,
  url: 'https://bookbook-phi.vercel.app',
  potentialAction: {
    '@type': 'SearchAction',
    target:
      'https://bookbook-phi.vercel.app/search/book?query={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
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
          <ScrollToTop />
          <RenderTopBar hasNoTopbarRoutes={hasNoTopbarRoutes} />
          <main>{children}</main>
          <div id="loader" />
        </QueryClientProviders>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </body>
    </html>
  )
}
