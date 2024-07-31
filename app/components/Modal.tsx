import { useEffect, JSX } from 'react'

import modal from '@/styles/modal.module.scss'

interface Props {
  onClickOutside: () => void
  content: JSX.Element
  bottom: JSX.Element
  size?: 'md'
}

export default function Modal({
  onClickOutside,
  content,
  bottom,
  size,
}: Props) {
  const onClickInside = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  useEffect(() => {
    // 모달창 외부화면 스크롤 방지
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [])

  return (
    <div className={modal.wrapper} onMouseDown={onClickOutside}>
      <div
        className={`${modal.modal} ${size && modal['modal-sm']}`}
        onMouseDown={onClickInside}
      >
        {content}
        <div className={modal.bottom}>{bottom}</div>
      </div>
    </div>
  )
}
