import useHandleUnauthorized from '@/(auth)/_hooks/useHandleUnauthorized'
import member from '@/(member)/services'
import { debounce } from 'lodash'
import { useState } from 'react'

export default function useToggleRecommend(initialState: boolean) {
  const { handleUnauthorized } = useHandleUnauthorized()

  const [active, setActive] = useState(initialState)

  const onChangeToggle = debounce(async () => {
    try {
      await member.toggleRecommend()
      setActive((prev) => !prev)
    } catch (error) {
      handleUnauthorized(error, 'alert')
    }
  }, 300)

  return { active, onChangeToggle }
}
