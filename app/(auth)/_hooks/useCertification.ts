import { debounce } from 'lodash'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import useBoundStore from '@/stores'
import auth from '@/(auth)/services'

export interface CertificationProps {
  purpose: 'signUp' | 'resetPw'
}

export default function useCertification({ purpose }: CertificationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({ email: '', code: '' })

  const [isValidEmail, setisValidEmail] = useState<number | null>(null)

  const [showCode, setShowCode] = useState(false)
  const setCertifiedEmail = useBoundStore((state) => state.setCertifiedEmail)
  const router = useRouter()

  const isSignUp = purpose === 'signUp'

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  /**
   * @description 인증번호 요청
   */
  const requestMailCode = async () => {
    setIsLoading(true)
    try {
      await auth.requestEmailCertification(form.email)
      setShowCode(true)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  /**
   * @description 이메일 검사 및 인증번호 요청
   */
  const requestCertifications = debounce(async () => {
    // 이메일 패턴 검사
    const emailReg = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
    if (!emailReg.test(form.email)) {
      setisValidEmail(1)
      return
    }
    setisValidEmail(0)
    setIsLoading(true)
    try {
      // 이메일 존재 여부 검사
      const res = await auth.checkEmail(form.email)
      // 인증 목적에 따라 조건과 오류 코드를 나눕니다.
      const errorCondition = isSignUp ? res.exists : !res.exists
      const errorCode = isSignUp ? 2 : 3
      setIsLoading(false)
      if (errorCondition) {
        setisValidEmail(errorCode)
        return
      }
      await requestMailCode()
    } catch (error) {
      console.log('Error with check Email: ', error)
    }
    setIsLoading(false)
  }, 300)

  /**
   * @description 사용자가 입력한 인증번호 검증
   */
  const verify = debounce(async () => {
    const redirectUrl =
      purpose === 'signUp' ? '/signup/next' : '/find_password/next'
    setIsLoading(true)
    try {
      const res = await auth.verifyCode(form.email, form.code)
      if (res) {
        window.alert('인증에 성공하였습니다.')
        setCertifiedEmail(form.email)
        router.push(redirectUrl)
      } else {
        window.alert('인증에 실패하였습니다. 다시 시도하세요.')
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }, 300)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await verify()
  }

  return {
    isLoading,
    form,
    onChangeForm,
    isValidEmail,
    showCode,
    requestCertifications,
    onSubmit,
  }
}
