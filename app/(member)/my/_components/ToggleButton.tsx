'use client'

import { useState } from 'react'
import { debounce } from 'lodash'
// import { handleUnauthorized } from '@/(auth)/_utils/handleUnauthorized'
import { toggleRecommend } from '../actions'

export default function ToggleButton({
  isRecommendActive,
}: {
  isRecommendActive: boolean
}) {
  const [active, setActive] = useState(isRecommendActive)

  const onChangeToggle = debounce(async () => {
    try {
      await toggleRecommend()
      setActive((prev) => !prev)
    } catch (error) {
      // handleUnauthorized(error, 'alert')
    }
  }, 300)

  return (
    <>
      <label htmlFor="recommend">추천 설정</label>
      <input
        id="recommend"
        type="checkbox"
        checked={active}
        className="toggle"
        onChange={onChangeToggle}
      />
    </>
  )
}
