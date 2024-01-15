import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Head from "components/Head";
import useSignUp from "hooks/useSignUp";
import styles from "styles/auth.module.scss";

import EmailCertiForSignUp from "./EmailCertiForSignUp";

export default function SignUp() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    form,
    isButtonDisabled,
    checkPassword,
    onChange,
    onSubmit,
    validatePw,
    isSamePw,
    checkValidation,
  } = useSignUp();

  useEffect(() => {
    if (pathname === "/signup/next") {
      // 인증 상태 요청
      if (form.email !== "") {
        checkValidation(form.email);
        return;
      }
      navigate("/signup");
    }
  }, [checkValidation, form.email, navigate, pathname]);

  return (
    <div className={styles.wrapper}>
      <Head title="회원가입 | 북북" />
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link to="/">북북</Link>
        </div>
        {pathname === "/signup" ? (
          <EmailCertiForSignUp email={form.email} onChange={onChange} />
        ) : (
          <form onSubmit={onSubmit} className={styles.form} noValidate>
            <input
              className={`${styles.input} ${
                validatePw === false && styles.error
              }`}
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              onBlur={checkPassword}
              autoComplete="off"
              placeholder="비밀번호"
            />
            {validatePw === false && (
              <span>비밀번호: 8~16자의 영문, 숫자를 사용해 주세요.</span>
            )}
            <input
              className={`${styles.input} ${
                isSamePw === false && styles.error
              }`}
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
        )}
      </div>
    </div>
  );
}
