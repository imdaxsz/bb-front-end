import api from "../api/api";
import styles from "../styles/scss/auth.module.scss";
import { useState, FormEvent } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [blankEmail, setBlankEmail] = useState(false);
  const [blankPw, setBlankPw] = useState(false);

  const disabled = email !== "" && password !== "";

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.length <= 0) setBlankEmail(true);
    else if (password.length <= 0) setBlankPw(true);
    if (!blankEmail && !blankPw) {
      api.post("/api/user/signin", { email, password }).then((res) => {
        if (res.status === 200 && res.data !== 'ID or PW error') {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          window.location.href = "/";
        } else console.log('아이디 또는 비밀번호를 다시 확인해주세요.');
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <a href="/">북북</a>
        <form onSubmit={onSubmit} className={styles.form}>
          <input className={styles.input} name="email" type="email" value={email} onChange={onChangeEmail} required placeholder="이메일" />
          <input
            className={styles.input}
            name="password"
            type="password"
            value={password}
            onChange={onChangePw}
            autoComplete="off"
            placeholder="비밀번호"
          />
          <input className={styles.submit} disabled={!disabled} type="submit" value="로그인" />
        </form>
        <ul className={styles.find}>
          <li>
            <a href="/find_password">비밀번호 찾기</a>
          </li>
          <li>
            <a href="/signup">회원가입</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
