'use client'

import useToggleRecommend from '../_hooks/useToggleRecommend'

export default function ToggleButton({
  isRecommendActive,
}: {
  isRecommendActive: boolean
}) {
  const { active, onChangeToggle } = useToggleRecommend(isRecommendActive)

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
