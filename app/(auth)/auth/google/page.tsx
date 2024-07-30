import { PageSearchParams } from '@/types'
import { fetchGoogleSignToken } from '@/(auth)/actions'
import { redirect } from 'next/navigation'

export default async function GoogleRedirect({
  searchParams,
}: PageSearchParams) {
  // 1. 인가코드
  const { code } = searchParams
  if (!code) redirect('/')

  // 2. 인가코드 서버에 보내면서 로그인 or 회원가입 요청
  const { token } = await fetchGoogleSignToken(code as string)
  redirect(`google/callback?token=${token}`)
}
