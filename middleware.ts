import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privateRoutes = [
  '/my',
  '/review',
  '/write',
  '/leave',
  '/search/review',
  '/search/likes',
]

const guestRoutes = ['/signin', '/signup', '/auth/google', '/find_password']

export function middleware(request: NextRequest) {
  const token = cookies().get('token')
  const currentPath = request.nextUrl.pathname

  const isCurrentPathPrivateRoute = privateRoutes.some(
    (route) => currentPath === route || currentPath.startsWith(route),
  )

  const isCurrentPathGuestRoute = guestRoutes.some(
    (route) => currentPath === route || currentPath.startsWith(route),
  )

  if (!token && isCurrentPathPrivateRoute) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (token && isCurrentPathGuestRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|fonts|images|.*\\.svg).*)',
  ],
}
