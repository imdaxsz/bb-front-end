'use client'

import useUserSetup from '@/(auth)/_hooks/useUserSetup'
import Loader from '@/components/Loader'
import styles from '@/styles/auth.module.scss'

export default function FindPasswordNext() {
  const {
    isLoading,
    form,
    isButtonDisabled,
    checkPassword,
    onChange,
    onSubmit,
    isValidPw,
    isSamePw,
  } = useUserSetup({ newUser: false })
  return (
    <div>
      {isLoading && <Loader />}
      <h2 className={styles['label-sm']}>비밀번호 재설정</h2>
      <form onSubmit={onSubmit} noValidate className={styles.form}>
        <input
          className={styles.input}
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          onBlur={checkPassword}
          autoComplete="off"
          placeholder="새 비밀번호 입력"
        />
        {isValidPw === false && (
          <span>비밀번호: 8~16자의 영문, 숫자를 사용해 주세요.</span>
        )}
        <input
          className={styles.input}
          name="confirmPw"
          type="password"
          value={form.confirmPw}
          onChange={onChange}
          autoComplete="off"
          placeholder="새 비밀번호 확인"
        />
        {isSamePw === false && <span>비밀번호가 일치하지 않습니다.</span>}
        <input
          className={styles.submit}
          type="submit"
          value="완료"
          disabled={isButtonDisabled}
        />
      </form>
    </div>
  )
}
