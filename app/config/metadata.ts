import { Metadata } from 'next'
import { SERVICE_URL } from '.'

export const baseMetadata: Metadata = {
  title: {
    template: '%s | 북북',
    default: '북북 | 도서 리뷰 및 추천 서비스',
  },
  description: '도서 리뷰를 작성하고 다음에 읽을 도서를 추천받아보세요.',
  verification: {
    google: '_Phk681bVpcJD9Nijvey2eoGnPFOYzJQ9Y7Hvm4_hBk',
  },
  other: {
    'naver-site-verification': '7331d2415d59dafb86997bf9bac00e2ee391fdbf',
  },
  metadataBase: new URL(SERVICE_URL),
  openGraph: {
    siteName: '북북',
    images: {
      url: '/og-image.png',
    },
  },
  twitter: {
    title: '북북',
    images: {
      url: '/og-image.png',
    },
  },
  manifest: '/manifest.json',
  icons: [{ rel: 'apple-touch-icon', url: '/logo/icon-512x512.png' }],
}
