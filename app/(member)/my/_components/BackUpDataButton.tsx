'use client'

import useBackUpData from '../_hooks/useBackUpData'

export default function BackUpDataButton() {
  const { onClickBackUp } = useBackUpData()

  return (
    <button type="button" className="btn btn-primary" onClick={onClickBackUp}>
      데이터 요청하기
    </button>
  )
}
