import { renderHook, act } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import useSignOut from './useSignOut'
import { deleteServerToken } from '../_utils/deleteToken'

jest.mock('../_utils/deleteToken', () => ({
  deleteServerToken: jest.fn(),
}))

jest.mock('next/navigation')

const push = jest.fn()
;(useRouter as jest.Mock).mockImplementation(() => ({
  push,
}))

describe('useSignOut', () => {
  it('쿠키에서 토큰이 삭제되어야 한다.', async () => {
    const { result } = renderHook(() => useSignOut())
    await act(async () => {
      await result.current.signOut()
    })
    expect(deleteServerToken).toHaveBeenCalled()
  })

  it('리다이렉트 url이 있다면 해당 경로로 리다이렉트 해야 한다.', async () => {
    const { result } = renderHook(() => useSignOut())

    await act(async () => {
      await result.current.signOut('/test')
    })
    expect(push).toHaveBeenCalledWith('/test')
  })
})
