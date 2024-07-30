import { Metadata } from 'next'
import styles from '@/styles/my.module.scss'
import Link from 'next/link'
import { nextFetch } from '@/lib/fetch'
import { User } from '@/types'
import { getToken } from '@/(auth)/_utils/getToken'
import { redirect } from 'next/navigation'
import ChangePassword from './_components/ChangePassword'
import SignOutButton from './_components/SignOutButton'
import BackUpDataButton from './_components/BackUpDataButton'
import ToggleButton from './_components/ToggleButton'

export const metadata: Metadata = {
  title: '마이페이지',
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
          <span className={styles.title}>이메일</span>
          <span className={styles['user-info']}>{email}</span>
          <SignOutButton />
        </div>
        <div className={styles['password-wrapper']}>
          <div className={styles.title}>비밀번호 재설정</div>
          <div className={styles.password}>
            <ChangePassword isOauthUser={oauth} />
          </div>
        </div>
        <div className={styles['item-wrapper']}>
          <span className={styles['title-md']}>후기 작성 후 책 추천</span>
          <ToggleButton isRecommendActive={recommend} />
        </div>
        <div className={styles['item-wrapper']}>
          <span className={styles['title-md']}>후기 데이터 다운로드</span>
          <BackUpDataButton />
        </div>
        <div className={styles['item-wrapper']}>
          <Link href="/leave">회원 탈퇴</Link>
        </div>
      </div>
    </div>
  )
}
