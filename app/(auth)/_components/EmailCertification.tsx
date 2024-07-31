import Loader from '@/components/Loader'
import styles from '@/styles/auth.module.scss'
import useCertification, {
  CertificationProps,
} from '../_hooks/useCertification'

export default function EmailCertification({ purpose }: CertificationProps) {
  const {
    isLoading,
    isValidEmail,
    form,
    onChangeForm,
    showCode,
    requestCertifications,
    onSubmit,
  } = useCertification({ purpose })

  const isError = isValidEmail && isValidEmail > 0 && isValidEmail < 4

  return (
    <form onSubmit={onSubmit} className={styles.form} noValidate>
      {isLoading && <Loader />}
      <>
        <input
          className={`${styles.input} ${isError && styles.error}`}
          name="email"
          type="email"
          value={form.email}
          onChange={onChangeForm}
          placeholder="이메일"
        />
        {isValidEmail === 1 && <span>이메일: 올바르지 않은 형식입니다.</span>}
        {isValidEmail === 2 && <span>이미 사용중인 이메일입니다.</span>}
        {isValidEmail === 3 && <span>존재하지 않는 이메일입니다.</span>}
      </>
      {showCode ? (
        <>
          <input
            className={`${styles.input}`}
            name="code"
            type="text"
            value={form.code}
            onChange={onChangeForm}
            placeholder="인증번호"
          />
          <span
            style={{ textAlign: 'center', color: '#888', marginTop: '5px' }}
          >
            인증번호가 메일로 발송되었습니다.
            <br />
            30분 안에 인증번호를 입력해 주세요.
          </span>
          <input
            className={styles.submit}
            type="submit"
            value="인증번호 확인"
          />
        </>
      ) : (
        <input
          className={styles.submit}
          onClick={requestCertifications}
          type="button"
          value="인증번호 요청"
          disabled={form.email === ''}
        />
      )}
    </form>
  )
}
