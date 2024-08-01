import { handleApiError } from '@/libs/fetch'

export const handleUnauthorized = (
  error: unknown,
  option?: 'alert' | 'confirm',
  callback?: () => void,
) => {
  const { status } = handleApiError(error)
  if (status !== 401) return

  // alert 후 로그아웃 처리
  if (option === 'alert') {
    window.alert('로그인 유지 시간이 만료되었어요!\n다시 로그인 해주세요.')
    console.log('로그아웃 처리')
    return
  }
  // 사용자가 확인 클릭 시에만 로그아웃 처리
  if (option === 'confirm') {
    const ok = window.confirm(
      '로그인 유지 시간이 만료되었어요!\n로그인 페이지로 이동할까요?',
    )
    if (ok) console.log('로그아웃 처리')
    return
  }
  // 위 두 조건이 아닐 경우 바로 로그아웃 처리
  if (callback) callback()
}
