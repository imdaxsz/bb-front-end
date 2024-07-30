import useSignOut from '@/(auth)/_hooks/useSignOut'
import { deleteAccount } from '@/(auth)/actions'
import { handleApiError } from '@/lib/fetch'
import { debounce } from 'lodash'
import { useState } from 'react'

export default function useLeaveForm() {
  const [form, setForm] = useState({ agree: false, password: '' })
  const { signOut } = useSignOut()

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    if (name === 'agree') {
      setForm((prev) => ({ ...prev, agree: e.target.checked }))
      return
    }
    setForm((prev) => ({ ...prev, password: e.target.value }))
  }

  const handleForm = debounce(async () => {
    if (!form.agree) {
      window.alert('회원 탈퇴 동의를 체크해 주세요.')
    }
    try {
      await deleteAccount(form.password)
      signOut()
    } catch (err) {
      const { status } = handleApiError(err)

      if (status === 400) window.alert('비밀번호를 다시 확인하세요.')
    }
  }, 300)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleForm()
  }

  return { form, onChangeForm, onSubmit }
}
