export const hasNoTopbarRoutes = [
  '/signin',
  '/signup',
  '/auth/google',
  '/find_password',
  '/write',
]

export const privateRoutes = [
  '/my',
  '/review',
  '/write',
  '/leave',
  '/search/review',
  '/search/likes',
]

export const guestRoutes = [
  '/signin',
  '/signup',
  // '/auth/google', ISSUE - Error: failed to pipe response 발생
  '/find_password',
]

export const menuRoutes = [
  {
    key: 'home',
    path: '/',
    match: /^\/$|^\/search\/review/,
    prefetch: true,
    label: '리뷰',
  },
  {
    key: 'likes',
    path: '/likes',
    match: /^(\/likes|\/search\/likes)/,
    prefetch: false,
    label: '관심도서',
  },
  {
    key: 'recommend',
    path: '/recommend?page=1',
    match: /^(\/recommend|\/search\/book)/,
    prefetch: false,
    label: '추천도서',
  },
]

export const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT

export const SERVICE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://bookbook-phi.vercel.app/'
