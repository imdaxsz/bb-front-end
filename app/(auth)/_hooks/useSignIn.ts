'use client'

import { useState } from 'react'
import { fetchTokenCookie, requestEmailSignIn } from '@/(auth)/actions'
import { handleApiError } from '@/lib/fetch'
import useBoundStore from '@/store'

export default function useSignIn() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(false)
  const fetchToken = useBoundStore((state) => state.fetchToken)

  let isButtonDisabled =
    form.email.trim().length === 0 || form.password.trim().length === 0

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    isButtonDisabled = true

    try {
      const { token } = await requestEmailSignIn(form)
      fetchToken(token)
      fetchTokenCookie(token)
    } catch (err) {
      const { status } = handleApiError(err)
      if (status === 409)
        window.alert(
          '구글 연동으로 가입된 계정입니다. 구글 로그인을 이용해주세요.',
        )
      if (status === 400) setError(true)
    }
  }

  return { form, error, isButtonDisabled, onChange, onSubmit }
}
