import { FormEvent, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";

import api from "@/api";
import styles from "@/styles/auth.module.scss";

import EmailCertiForSignUp from "./EmailCertiForSignUp";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [validatePw, setValidatePw] = useState<boolean | null>(null);
  const [isSamePw, setIsSamePw] = useState<boolean | null>(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const disabled = password !== "" && pwConfirm !== "";

  const checkPassword = () => {
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    if (passwordReg.test(password)) setValidatePw(true);
    else setValidatePw(false);
  };

  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangePwConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwConfirm(e.target.value);
    if (password !== e.target.value) setIsSamePw(false);
    else setIsSamePw(true);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validatePw) setValidatePw(false);
    else if (!isSamePw) setIsSamePw(false);
    if (validatePw && isSamePw) {
      api.post("/api/user/signup", { email, password }).then((res) => {
        if (res.status === 200) {
          window.alert("가입이 완료되었습니다!");
          navigate("/signin");
        }
      });
    }
  };

  useEffect(() => {
    if (pathname === "/signup/next") {
      // 인증 상태 요청
      if (email !== "") {
        api.get(`/api/certification/certi-status/${email}`).then((res) => {
          if (!(res.status === 200) || !res.data) navigate("/signup");
        });
      } else navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, pathname]);

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>북북 - 회원가입</title>
      </Helmet>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link to="/">북북</Link>
        </div>
        {pathname === "/signup" ? (
          <EmailCertiForSignUp email={email} setEmail={setEmail} />
        ) : (
          <form onSubmit={onSubmit} className={styles.form} noValidate>
            <input
              className={`${styles.input} ${
                validatePw === false && styles.error
              }`}
              name="password"
              type="password"
              value={password}
              onChange={onChangePw}
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
              name="pwConfirm"
              type="password"
              value={pwConfirm}
              onChange={onChangePwConfirm}
              autoComplete="off"
              placeholder="비밀번호 확인"
            />
            {isSamePw === false && <span>비밀번호가 일치하지 않습니다.</span>}
            <input
              className={styles.submit}
              disabled={!disabled}
              type="submit"
              value="가입하기"
            />
          </form>
        )}
      </div>
    </div>
  );
}
