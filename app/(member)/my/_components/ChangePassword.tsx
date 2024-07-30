'use client'

import styles from '@/styles/auth.module.scss'
import btnstyles from '@/styles/my.module.scss'
import useChangePassword from '../_hooks/useChangePassword'

export default function ChangePassword({
  isOauthUser,
}: {
  isOauthUser: boolean
}) {
  const {
    form,
    isvalidatedPw,
    isSamePw,
    error,
    errorMessage,
    hasEmptyField,
    onChange,
    onBlur,
    onSubmit,
  } = useChangePassword()

  return (
    <form onSubmit={onSubmit}>
      <input
        className={styles.input}
        name="currentPw"
        type="password"
        value={form.currentPw}
        onChange={onChange}
        autoComplete="off"
        placeholder="현재 비밀번호"
        disabled={isOauthUser}
      />
      <input
        className={`${styles.input} ${isvalidatedPw === false && styles.error}`}
        name="newPw"
        type="password"
        value={form.newPw}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
        placeholder="새 비밀번호"
        disabled={isOauthUser}
      />
      {isvalidatedPw === false && (
        <span>새 비밀번호: 8~16자의 영문, 숫자를 사용해 주세요.</span>
      )}
      <input
        className={`${styles.input} ${isSamePw === false && styles.error}`}
        name="confirmPw"
        type="password"
        value={form.confirmPw}
        onChange={onChange}
        autoComplete="off"
        placeholder="새 비밀번호 확인"
        disabled={isOauthUser}
      />
      {isSamePw === false && <span>비밀번호가 일치하지 않습니다.</span>}
      {error !== 0 && <span>{errorMessage[error]}</span>}
      <button
        disabled={hasEmptyField}
        type="submit"
        className={btnstyles['btn-primary']}
      >
        변경
      </button>
    </form>
  )
}
