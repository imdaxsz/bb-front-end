'use client'

import useUserSetup from '@/(auth)/_hooks/useUserSetup'
import Loader from '@/components/Loader'
import styles from '@/styles/auth.module.scss'

export default function SignUp() {
  const {
    isLoading,
    form,
    isButtonDisabled,
    checkPassword,
    onChange,
    onSubmit,
    isValidPw,
    isSamePw,
  } = useUserSetup({ newUser: true })

  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={onSubmit} className={styles.form} noValidate>
        <input
          className={`${styles.input} ${isValidPw === false && styles.error}`}
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          onBlur={checkPassword}
          autoComplete="off"
          placeholder="비밀번호"
        />
        {isValidPw === false && (
          <span>비밀번호: 8~16자의 영문, 숫자를 사용해 주세요.</span>
        )}
        <input
          className={`${styles.input} ${isSamePw === false && styles.error}`}
          name="confirmPw"
          type="password"
          value={form.confirmPw}
          onChange={onChange}
          autoComplete="off"
          placeholder="비밀번호 확인"
        />
        {isSamePw === false && <span>비밀번호가 일치하지 않습니다.</span>}
        <input
          className={styles.submit}
          disabled={isButtonDisabled}
          type="submit"
          value="가입하기"
        />
      </form>
    </>
  )
}
