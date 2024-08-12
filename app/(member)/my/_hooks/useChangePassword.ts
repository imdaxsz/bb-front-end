import member from '@/(member)/services'
import { handleApiError } from '@/libs/fetch'
import { validatePassword } from '@/utils/validatePassword'
import { useState } from 'react'
import { debounce } from 'lodash'
// import { handleUnauthorized } from '@/(auth)/_utils/handleUnauthorized'

export default function useChangePassword() {
  const [form, setForm] = useState({
    currentPw: '',
    newPw: '',
    confirmPw: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const hasEmptyField =
    form.currentPw.trim().length === 0 ||
    form.newPw.trim().length === 0 ||
    form.confirmPw.trim().length === 0

  const [isvalidPw, setIsValidPw] = useState<boolean | null>(null)
  const [isSamePw, setIsSamePw] = useState<boolean | null>(null)

  const [error, setError] = useState(0)
  const errorMessage = [
    '',
    '비밀번호를 정확하게 입력해주세요.',
    '현재 비밀번호와 같은 비밀번호는 사용할 수 없습니다.',
  ]

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === 'confirmPw') setIsSamePw(form.newPw === value)
  }

  const onBlur = () => setIsValidPw(validatePassword(form.newPw))

  const handleForm = debounce(async () => {
    const sameCurrentPw = form.newPw === form.currentPw && form.newPw !== ''
    // 현재 비밀번호와 동일 비밀번호인가
    if (sameCurrentPw) {
      setError(2)
      return
    }
    if (isvalidPw && isSamePw && !sameCurrentPw) {
      setIsLoading(true)
      try {
        await member.changePassword(form.currentPw, form.newPw)
        window.alert('비밀번호 변경이 완료되었습니다.')
        window.location.reload()
      } catch (err) {
        const { status } = handleApiError(err)
        if (status === 400) {
          window.alert('비밀번호가 틀렸습니다!')
        }
        // handleUnauthorized(error, 'alert')
      }
      setIsLoading(false)
    }
  }, 300)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleForm()
  }

  return {
    form,
    isvalidPw,
    isSamePw,
    error,
    errorMessage,
    hasEmptyField,
    onChange,
    onBlur,
    onSubmit,
    isLoading,
  }
}
