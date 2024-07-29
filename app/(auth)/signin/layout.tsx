/* eslint-disable react/jsx-no-useless-fragment */
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '로그인',
}

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
