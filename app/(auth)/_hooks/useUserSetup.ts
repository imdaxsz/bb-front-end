import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'
import {
  checkCertiStatus,
  signUp as requestSignUp,
  resetPassword as requestResetPw,
} from '@/(auth)/actions'
import { validatePassword } from '@/utils/validatePassword'
import useBoundStore from '@/stores'

export default function useUserSetup({ newUser }: { newUser: boolean }) {
  const { cerifiedEmail, resetCertifiedEmail } = useBoundStore((state) => ({
    cerifiedEmail: state.certifiedEmail,
    resetCertifiedEmail: state.resetCertifiedEmail,
  }))

  const [form, setForm] = useState({ password: '', confirmPw: '' })
  const [isValidPw, setIsValidPw] = useState<boolean | null>(null)
  const [isSamePw, setIsSamePw] = useState<boolean | null>(null) // 비밀번호, 비밀번호 확인 일치 여부
  const [isLoading, setIsLoading] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  const isButtonDisabled =
    form.password.trim().length === 0 || form.confirmPw.trim().length === 0

  /**
   * @description 비밀번호 정규식 검사
   */
  const checkPassword = () => {
    setIsValidPw(validatePassword(form.password))
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === 'confirmPw') setIsSamePw(form.password === value)
  }

  const signUp = async () => {
    await requestSignUp(cerifiedEmail, form.password)
    window.alert('가입이 완료되었습니다!')
  }

  const resetPassword = async () => {
    await requestResetPw(cerifiedEmail, form.password)
    window.alert('비밀번호 재설정이 완료되었습니다!')
  }

  const handleForm = debounce(async () => {
    if (isButtonDisabled) {
      window.alert('이메일, 비밀번호를 입력해 주세요!')
      return
    }

    if (isValidPw && isSamePw) {
      try {
        setIsLoading(true)
        // eslint-disable-next-line no-unused-expressions
        newUser ? await signUp() : await resetPassword()
        resetCertifiedEmail()
        router.push('/signin')
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
  }, 300)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleForm()
  }

  /**
   * @description 유효한 접근인지(이메일이 인증되었는지) 검사
   */
  const checkValidation = useCallback(
    async (email: string) => {
      const redirectUrl = newUser ? '/signup' : '/find_password'
      try {
        const { certified } = await checkCertiStatus(email)
        if (!certified) router.push(redirectUrl)
      } catch (error) {
        console.log(error)
        router.push(redirectUrl)
      }
    },
    [router, newUser],
  )

  useEffect(() => {
    if (['/signup/next', '/find_password/next'].includes(pathname)) {
      // 인증 상태 요청
      if (cerifiedEmail === '') {
        router.push(pathname.slice(0, -5))
        return
      }
      checkValidation(cerifiedEmail)
    }
  }, [checkValidation, cerifiedEmail, router, pathname])

  // 뒤로 가기 수행 시 인증 상태 초기화
  useEffect(() => {
    window.addEventListener('popstate', resetCertifiedEmail)

    return () => {
      window.removeEventListener('popstate', resetCertifiedEmail)
    }
  }, [resetCertifiedEmail])

  return {
    isLoading,
    form,
    isButtonDisabled,
    checkPassword,
    onChange,
    onSubmit,
    checkValidation,
    isValidPw,
    isSamePw,
  }
}
