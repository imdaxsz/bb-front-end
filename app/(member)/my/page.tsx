import { Metadata } from 'next'
import styles from '@/styles/my.module.scss'
import Link from 'next/link'
import { nextFetch } from '@/libs/fetch'
import { User } from '@/types'
import { getToken } from '@/(auth)/_utils/getToken'
import { redirect } from 'next/navigation'
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

  const info = await nextFetch<User>('/api/user/info').then((res) => res.body)
  const { email, recommend, oauth } = info

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles['item-wrapper']}>
          <h2 className={styles.title}>이메일</h2>
          <span className={styles['user-info']}>{email}</span>
          <SignOutButton />
        </div>
        <div className={styles['password-wrapper']}>
          <h2 className={styles.title}>비밀번호 재설정</h2>
          <div className={styles.password}>
            <ChangePassword isOauthUser={oauth} />
          </div>
        </div>
        <div className={styles['item-wrapper']}>
          <h2 className={styles['title-md']}>리뷰 작성 후 책 추천</h2>
          <ToggleButton isRecommendActive={recommend} />
        </div>
        <div className={styles['item-wrapper']}>
          <h2 className={styles['title-md']}>리뷰 데이터 다운로드</h2>
          <BackUpDataButton />
        </div>
        <div className={styles['item-wrapper']}>
          <Link href="/leave">회원 탈퇴</Link>
        </div>
      </div>
    </div>
  )
}
