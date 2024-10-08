import { Metadata } from 'next'
import styles from '@/styles/my.module.scss'
import Link from 'next/link'
import { handleApiError } from '@/libs/fetch'
import { getToken } from '@/(auth)/_utils/getToken'
import { redirect } from 'next/navigation'
import member from '@/(member)/services'
import ChangePassword from './_components/ChangePassword'
import SignOutButton from './_components/SignOutButton'
import BackUpDataButton from './_components/BackUpDataButton'
import ToggleButton from './_components/ToggleButton'

export const metadata: Metadata = {
  title: '마이페이지',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function MyPage() {
  const token = await getToken()

  if (!token) redirect('/signin')

  let info = null

  try {
    info = await member.getUserInfo()
  } catch (error) {
    const { status } = handleApiError(error)
    if (status === 401) redirect('/signout')
    if (!info) redirect('/signout')
  }

  const { email, recommend, oauth } = info

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles['item-wrapper']}>
          <h2 className={styles.label}>이메일</h2>
          <span className={styles.email}>{email}</span>
          <SignOutButton />
        </div>
        <div className={styles['password-wrapper']}>
          <h2 className={styles.label}>비밀번호 재설정</h2>
          <div className={styles.password}>
            <ChangePassword isOauthUser={oauth} />
          </div>
        </div>
        <div className={styles['item-wrapper']}>
          <h2 className={styles['label-md']}>리뷰 작성 후 책 추천</h2>
          <ToggleButton isRecommendActive={recommend} />
        </div>
        <div className={styles['item-wrapper']}>
          <h2 className={styles['label-md']}>리뷰 데이터 다운로드</h2>
          <BackUpDataButton />
        </div>
        <div className={styles['item-wrapper']}>
          <Link href="/leave">회원 탈퇴</Link>
        </div>
      </div>
    </div>
  )
}
