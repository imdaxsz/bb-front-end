import { PageSearchParams } from '@/types'
import { redirect } from 'next/navigation'
import auth from '@/(auth)/services'
import { handleApiError } from '@/libs/fetch'

export default async function GoogleRedirect({
  searchParams,
}: PageSearchParams) {
  // 1. 인가코드
  const { code } = searchParams
  if (!code) redirect('/')

  // 2. 인가코드 서버에 보내면서 로그인 or 회원가입 요청
  try {
    const { token } = await auth.fetchGoogleSignToken(code as string)
    redirect(`google/callback?token=${token}`)
  } catch (error) {
    const { status } = handleApiError(error)
    if (status === 409) {
      redirect(`google/callback?msg=conflict`)
    }
  }
}
