import type { Metadata } from 'next'
import styles from '@/styles/my.module.scss'
import { CheckFat } from '@phosphor-icons/react/dist/ssr'
import { nextFetch } from '@/libs/fetch'
import { User } from '@/types'
import LeaveForm from './_components/LeaveForm'

export const metadata: Metadata = {
  title: '회원탈퇴',
}

export default async function LeavePage() {
  const info = await nextFetch<User>('/api/user/info').then((res) => res.body)
  const { email, oauth } = info

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.leave}>
          <h2>회원 탈퇴 안내</h2>
          <div className={styles.inform}>
            <div className={styles.icon}>
              <CheckFat size={18} weight="fill" />
            </div>
            <h3>탈퇴할 경우 복구가 불가능합니다.</h3>
          </div>
          <div className={styles.inform}>
            <div className={styles.icon}>
              <CheckFat size={18} weight="fill" />
            </div>
            <h3>
              탈퇴 후 회원정보 및 서비스 이용기록(후기/관심 도서)는 모두
              삭제됩니다.
            </h3>
          </div>
          <LeaveForm isOauthUser={oauth} email={email} />
        </div>
      </div>
    </div>
  )
}
