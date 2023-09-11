import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/scss/auth.module.scss";
import { useState, FormEvent, useEffect } from "react";
import api from "../api/api";
import EmailCertiForResetPW from "./EmailCertiForResetPW";
import { Helmet } from "react-helmet-async";

export default function FindPassword() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const checkedEmail = !(pathname === "/find_password");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [validatePw, setValidatePw] = useState<boolean | null>(null);
  const [isSamePw, setIsSamePw] = useState<boolean | null>(null);

  const pwButtonDisabled = password !== "" && pwConfirm !== "";

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
    // TODO 비밀번호 재설정
    if (validatePw && isSamePw) {
      api.put("/api/user/reset_password", { email, password }).then((res) => {
        if (res.status === 200) {
          window.alert("비밀번호 재설정이 완료되었습니다!");
          navigate("/signin");
        }
      });
    }
  };

  useEffect(() => {
    if (pathname === "/find_password/next") {
      // 인증 상태 요청
      if (email !== "") {
        api.get(`/api/certification/certi-status/${email}`).then((res) => {
          if (!(res.status === 200) || !res.data) navigate("/find_password");
        });
      } else navigate("/find_password");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, pathname]);

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>북북 - 비밀번호 찾기</title>
      </Helmet>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link to="/">북북</Link>
        </div>
        {!checkedEmail ? (
          <>
            <h4 className={styles["label-sm"]}>본인 확인을 위해 이메일 인증을 해주세요.</h4>
            <EmailCertiForResetPW email={email} setEmail={setEmail} />
          </>
        ) : (
          <div>
            <h4 className={styles["label-sm"]}>비밀번호 재설정</h4>
            <form onSubmit={onSubmit} noValidate className={styles.form}>
              <input
                className={styles.input}
                name="password"
                type="password"
                value={password}
                onChange={onChangePw}
                onBlur={checkPassword}
                autoComplete="off"
                placeholder="새 비밀번호 입력"
              />
              {validatePw === false && <span>비밀번호: 8~16자의 영문, 숫자를 사용해 주세요.</span>}
              <input
                className={styles.input}
                name="pwConfirm"
                type="password"
                value={pwConfirm}
                onChange={onChangePwConfirm}
                autoComplete="off"
                placeholder="새 비밀번호 확인"
              />
              {isSamePw === false && <span>비밀번호가 일치하지 않습니다.</span>}
              <input className={styles.submit} type="submit" value="완료" disabled={!pwButtonDisabled} />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
