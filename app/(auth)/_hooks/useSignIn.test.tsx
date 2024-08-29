import { renderHook, act } from '@testing-library/react'
import auth from '@/(auth)/services'
import { handleApiError } from '@/libs/fetch'
import useSignIn from './useSignIn'
import { fetchTokenCookie } from '../_utils/fetchTokenCookie'

jest.mock('@/(auth)/services')
jest.mock('@/libs/fetch')
jest.mock('../_utils/fetchTokenCookie', () => ({
  fetchTokenCookie: jest.fn(),
}))

describe('useSignIn', () => {
  it('초기 값이 올바르게 설정되어야 한다.', () => {
    const { result } = renderHook(() => useSignIn())

    expect(result.current.form).toEqual({ email: '', password: '' })
    expect(result.current.error).toBe(false)
    expect(result.current.isButtonDisabled).toBe(true)
  })

  it('로그인 성공 시 토큰이 쿠키에 저장되어야 한다.', async () => {
    const token = 'test-token'
    ;(auth.requestEmailSignIn as jest.Mock).mockResolvedValueOnce({ token })

    const { result } = renderHook(() => useSignIn())

    await act(async () => {
      await result.current.onSubmit({ preventDefault: jest.fn() } as any)
    })

    expect(auth.requestEmailSignIn).toHaveBeenCalled()
    expect(fetchTokenCookie).toHaveBeenCalledWith(token)
  })

  it('로그인 실패 시 handleApiError가 호출되어야 한다.', async () => {
    const error = new Error('API Error')
    ;(auth.requestEmailSignIn as jest.Mock).mockRejectedValue(error)
    ;(handleApiError as jest.Mock).mockReturnValue({ status: 400 })

    const { result } = renderHook(() => useSignIn())

    await act(async () => {
      await result.current.onSubmit({ preventDefault: jest.fn() } as any)
    })

    expect(handleApiError).toHaveBeenCalledWith(error)
    expect(result.current.error).toBe(true)
  })
})
