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
