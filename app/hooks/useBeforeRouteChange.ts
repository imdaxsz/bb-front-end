/* eslint-disable consistent-return */

import { useCallback, useEffect } from 'react'

export default function useBeforeRouteChange(isSaved: boolean) {
  const handlePopState = useCallback(
    (e: PopStateEvent) => {
      e.preventDefault()

      if (isSaved) {
        const shouldLeave = window.confirm(
          '페이지에서 나가시겠습니까? 변경사항이 저장되지 않을 수 있습니다.',
        )

        if (!shouldLeave) {
          window.history.pushState(null, '', window.location.href)
          return
        }
      }
      window.history.go(-1)
    },
    [isSaved],
  )

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isSaved) event.preventDefault()
      return ''
    }
    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', handlePopState)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [handlePopState, isSaved])
}
