'use client'

import { ArrowUp } from '@phosphor-icons/react'
import { throttle } from 'lodash'
import { useEffect, useMemo, useState } from 'react'

const THROTTLE_WAIT = 300

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  /**
   * @description 스크롤 위치에 따라 버튼의 렌더링 여부를 설정
   */
  const handleIsVisible = useMemo(
    () =>
      throttle(() => {
        const { scrollY, innerHeight } = window
        setIsVisible(scrollY > innerHeight)
      }, THROTTLE_WAIT),
    [],
  )

  /**
   * @description 버튼 클릭 시 15ms마다 step만큼 스크롤 이동
   */
  const onClick = () => {
    const scrollStep = -window.scrollY / 20
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep)
        return
      }
      clearInterval(scrollInterval)
    }, 15)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleIsVisible)
    return () => {
      window.removeEventListener('scroll', handleIsVisible)
    }
  }, [handleIsVisible])

  return (
    <div>
      {isVisible && (
        <button
          type="button"
          className="scroll-btn"
          aria-label="최상단 이동"
          onClick={onClick}
        >
          <ArrowUp size={25} />
        </button>
      )}
    </div>
  )
}
