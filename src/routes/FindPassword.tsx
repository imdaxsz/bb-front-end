import { Link, useLocation } from "react-router-dom";

import Head from "components/Head";
import Loader from "components/Loader";
import useRegisterUser from "hooks/useRegisterUser";
import styles from "styles/auth.module.scss";

import EmailCertification from "./EmailCertification";

export default function FindPassword() {
  const { pathname } = useLocation();
  const checkedEmail = !(pathname === "/find_password");

  const {
    isLoading,
    form,
    isButtonDisabled,
    checkPassword,
    onChange,
    onSubmit,
    validatePw,
    isSamePw,
  } = useRegisterUser({ newUser: false });

  return (
    <div className={styles.wrapper}>
      <Head title="비밀번호 찾기 | 북북" />
      {isLoading && <Loader />}
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link to="/">북북</Link>
        </div>
        {!checkedEmail ? (
          <>
            <h4 className={styles["label-sm"]}>
              본인 확인을 위해 이메일 인증을 해주세요.
            </h4>
            <EmailCertification
              email={form.email}
              onChange={onChange}
              purpose="resetPw"
            />
          </>
        ) : (
          <div>
            <h4 className={styles["label-sm"]}>비밀번호 재설정</h4>
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
              {validatePw === false && (
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
        )}
      </div>
    </div>
  );
}
