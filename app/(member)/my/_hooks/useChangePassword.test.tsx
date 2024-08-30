import { renderHook, act, waitFor } from '@testing-library/react'
import member from '@/(member)/services'
import { handleApiError } from '@/libs/fetch'
import useChangePassword from './useChangePassword'

jest.mock('@/(member)/services')
jest.mock('@/libs/fetch')

jest.mock('@/(auth)/_hooks/useHandleUnauthorized', () => ({
  __esModule: true,
  default: () => ({
    handleUnauthorized: jest.fn(),
  }),
}))
jest.mock('@/(auth)/_utils/validatePassword', () => ({
  validatePassword: jest.fn().mockReturnValue(true),
}))

describe('useChangePassword', () => {
  const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {})

  it('초기값이 올바르게 설정되어야 한다.', () => {
    const { result } = renderHook(() => useChangePassword())

    expect(result.current.form).toEqual({
      currentPw: '',
      newPw: '',
      confirmPw: '',
    })
    expect(result.current.isvalidPw).toBeNull()
    expect(result.current.isSamePw).toBeNull()
    expect(result.current.error).toBe(0)
    expect(result.current.hasEmptyField).toBe(true)
    expect(result.current.isLoading).toBe(false)
  })

  it('새 비밀번호 input blur 시 유효성 검사, 비밀번호 확인 입력 시 비밀번호 일치 확인이 이루어져야 한다.', () => {
    const { result } = renderHook(() => useChangePassword())

    act(() => {
      result.current.onChange({
        target: { name: 'newPw', value: 'newPassword' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.onBlur()
    })

    expect(result.current.isvalidPw).toBe(true)

    act(() => {
      result.current.onChange({
        target: { name: 'confirmPw', value: 'newPassword' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.isSamePw).toBe(true)
  })

  it('새 비밀번호와 이전 비밀번호가 동일할 때 error 값이 2가 되어야 한다.', async () => {
    const { result } = renderHook(() => useChangePassword())

    act(() => {
      result.current.onChange({
        target: { name: 'currentPw', value: 'samePassword' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.onChange({
        target: { name: 'newPw', value: 'samePassword' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.onChange({
        target: { name: 'confirmPw', value: 'samePassword' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    await act(async () => {
      await result.current.onSubmit({
        preventDefault: (e: React.ChangeEvent<HTMLFormElement>) => {
          console.log(e)
        },
      } as React.ChangeEvent<HTMLFormElement>)
    })

    await waitFor(() => {
      expect(result.current.error).toBe(2)
    })
  })

  it('비밀번호 변경에 성공할 경우 성공 메시지 alert를 띄워야 한다.', async () => {
    ;(member.changePassword as jest.Mock).mockResolvedValueOnce({})

    const { result } = renderHook(() => useChangePassword())

    act(() => {
      result.current.onChange({
        target: { name: 'currentPw', value: 'oldPassword' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.onChange({
        target: { name: 'newPw', value: 'newPassword' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.onBlur()
    })

    act(() => {
      result.current.onChange({
        target: { name: 'confirmPw', value: 'newPassword' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    await act(async () => {
      await result.current.onSubmit({
        preventDefault: (e: React.ChangeEvent<HTMLFormElement>) => {
          console.log(e)
        },
      } as React.ChangeEvent<HTMLFormElement>)
    })

    await waitFor(() => {
      expect(member.changePassword).toHaveBeenCalled()
      expect(mockAlert).toHaveBeenCalledWith('비밀번호 변경이 완료되었습니다.')
    })
  })

  it('비밀번호가 틀렸을 경우, 오류 메시지 alert를 띄워야 한다.', async () => {
    const error = new Error('API Error')
    ;(member.changePassword as jest.Mock).mockRejectedValueOnce(error)
    ;(handleApiError as jest.Mock).mockReturnValue({ status: 400 })

    const { result } = renderHook(() => useChangePassword())

    act(() => {
      result.current.onChange({
        target: { name: 'currentPw', value: 'oldPassword' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.onChange({
        target: { name: 'newPw', value: 'newPassword' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.onBlur()
    })

    act(() => {
      result.current.onChange({
        target: { name: 'confirmPw', value: 'newPassword' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    await act(async () => {
      await result.current.onSubmit({
        preventDefault: (e: React.ChangeEvent<HTMLFormElement>) => {
          console.log(e)
        },
      } as React.ChangeEvent<HTMLFormElement>)
    })

    await waitFor(() => {
      expect(member.changePassword).toHaveBeenCalled()
      expect(handleApiError).toHaveBeenCalledWith(error)
      expect(window.alert).toHaveBeenCalledWith('비밀번호가 틀렸습니다!')
    })
  })
})
