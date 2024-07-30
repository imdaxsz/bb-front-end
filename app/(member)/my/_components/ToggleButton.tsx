'use client'

import { useState } from 'react'
import { debounce } from 'lodash'
import { toggleRecommend } from '../actions'

export default function ToggleButton({
  isRecommendActive,
}: {
  isRecommendActive: boolean
}) {
  const [active, setActive] = useState(isRecommendActive)

  const onChangeToggle = debounce(async () => {
    await toggleRecommend()
    setActive((prev) => !prev)
  }, 300)

  return (
    <input
      type="checkbox"
      checked={active}
      className="toggle"
      onChange={onChangeToggle}
    />
  )
}
