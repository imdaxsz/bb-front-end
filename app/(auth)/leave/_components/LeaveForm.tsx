'use client'

import styles from '@/styles/my.module.scss'
import useLeaveForm from '../_hooks/useLeaveForm'

interface LeaveFormProps {
  isOauthUser: boolean
  email: string
}

export default function LeaveForm({ isOauthUser, email }: LeaveFormProps) {
  const { form, onChangeForm, onSubmit } = useLeaveForm({ isOauthUser })
  const { password } = form

  return (
    <div>
      <form onSubmit={onSubmit} className={styles['delete-form']}>
        <div className={styles.message}>
          <input
            id="agree"
            name="agree"
            type="checkbox"
            onChange={onChangeForm}
          />
          <label htmlFor="agree">
            &nbsp; 위 내용을 이해했으며, 모두 동의합니다.
          </label>
        </div>
        {!isOauthUser && (
          <>
            <h3>본인 확인을 위해 {email} 계정의 비밀번호를 입력해주세요.</h3>
            <input
              name="currentPw"
              type="password"
              value={password}
              onChange={onChangeForm}
              placeholder="비밀번호 입력"
              autoComplete="off"
              className={styles.input}
            />
          </>
        )}
        <button type="submit" className={styles['btn-primary']}>
          회원 탈퇴
        </button>
      </form>
    </div>
  )
}
