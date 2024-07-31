'use client'

import { usePathname } from 'next/navigation'
import TopBar from './TopBar'

export default function RenderTopBar({
  hasNoTopbarRoutes,
}: {
  hasNoTopbarRoutes: string[]
}) {
  const pathname = usePathname()
  const hasTopbar = hasNoTopbarRoutes.some((route) =>
    pathname.startsWith(route),
  )

  return hasTopbar ? <></> : <TopBar />
}
