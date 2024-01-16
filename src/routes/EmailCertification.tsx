import Loader from "components/Loader";
import useCertification, { CertificationProps } from "hooks/useCertification";
import styles from "styles/auth.module.scss";

interface Props extends CertificationProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EmailCertification({
  email,
  onChange,
  purpose,
}: Props) {
  const {
    isLoading,
    validateEmail,
    code,
    onChangeCode,
    showCode,
    requestCertifications,
    onSubmit,
  } = useCertification({ email, purpose });

  const isError = validateEmail && validateEmail > 0 && validateEmail < 4;

  return (
    <form onSubmit={onSubmit} className={styles.form} noValidate>
      {isLoading && <Loader />}
      <>
        <input
          className={`${styles.input} ${isError && styles.error}`}
          name="email"
          type="email"
          value={email}
          onChange={onChange}
          placeholder="이메일"
        />
        {validateEmail === 1 && <span>이메일: 올바르지 않은 형식입니다.</span>}
        {validateEmail === 2 && <span>이미 사용중인 이메일입니다.</span>}
        {validateEmail === 3 && <span>존재하지 않는 이메일입니다.</span>}
      </>
      {showCode ? (
        <>
          <input
            className={`${styles.input}`}
            name="code"
            type="text"
            value={code}
            onChange={onChangeCode}
            placeholder="인증번호"
          />
          <span
            style={{ textAlign: "center", color: "#888", marginTop: "5px" }}
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
          disabled={email === ""}
        />
      )}
    </form>
  );
}
