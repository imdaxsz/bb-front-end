import api from "../api/api";
import styles from "../styles/scss/auth.module.scss";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  const [validateEmail, setValidateEmail] = useState<number | null>(null);
  const [validatePw, setValidatePw] = useState<boolean | null>(null);
  const [isSamePw, setIsSamePw] = useState<boolean | null>(null);

  const navigate = useNavigate();

  const active = email !== "" && password !== "" && pwConfirm !== "";

  const checkEmail = () => {
    const emailReg = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (emailReg.test(email)) {
      // 패턴 검사
      setValidateEmail(0);
      api.post("/api/user/checkemail", { email }).then((res) => {
        if (res.status === 200 && res.data.exists) setValidateEmail(2);
      });
    } else setValidateEmail(1);
  };

  const checkPassword = () => {
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    if (passwordReg.test(password)) setValidatePw(true);
    else setValidatePw(false);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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
    if (email.length === 0) setValidateEmail(1);
    else if (!validatePw) setValidatePw(false);
    else if (!isSamePw) setIsSamePw(false);
    console.log(validateEmail, validatePw, isSamePw);
    if (validateEmail === 0 && validatePw && isSamePw) {
      api.post("/api/user/signup", { email, password }).then((res) => {
        if (res.status === 200) {
          window.alert("가입이 완료되었습니다!");
          navigate("/signin");
        }

      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <a href="/">북북</a>
        <form onSubmit={onSubmit} className={styles.form}>
          <input
            className={`${styles.input} ${(validateEmail === 1 || validateEmail === 2) && styles.error}`}
            name="email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            onBlur={checkEmail}
            required
            placeholder="이메일"
          />
          {validateEmail === 1 && <span>{email.length <= 0 ? "이메일을 입력해주세요." : "이메일: 올바르지 않은 형식입니다."}</span>}
          {validateEmail === 2 && <span>{"이미 사용중인 이메일입니다."}</span>}
          <input
            className={`${styles.input} ${validatePw === false && styles.error}`}
            name="password"
            type="password"
            value={password}
            onChange={onChangePw}
            onBlur={checkPassword}
            autoComplete="off"
            placeholder="비밀번호"
          />
          {validatePw === false && (
            <span>{password.length <= 0 ? "비밀번호를 입력해주세요." : `비밀번호: 8~16자의 영문, 숫자를 사용해 주세요.`}</span>
          )}
          <input
            className={`${styles.input} ${isSamePw === false && styles.error}`}
            name="pwConfirm"
            type="password"
            value={pwConfirm}
            onChange={onChangePwConfirm}
            autoComplete="off"
            placeholder="비밀번호 확인"
          />
          {isSamePw === false && <span>비밀번호가 일치하지 않습니다.</span>}
          <input className={styles.submit} disabled={!active} type="submit" value="가입하기" />
        </form>
      </div>
    </div>
  );
}
