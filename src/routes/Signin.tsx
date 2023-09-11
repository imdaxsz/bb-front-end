import api from "../api/api";
import styles from "../styles/scss/auth.module.scss";
import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { signin } from "../store/authSlice";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [blankEmail, setBlankEmail] = useState(false);
  const [blankPw, setBlankPw] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        if (res.status === 200 && res.data !== "ID or PW error") {
          dispatch(signin(res.data.token));
          navigate("/");
        } else setError(true);
      });
    }
  };

  const onClickGoogle = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>북북 - 로그인</title>
      </Helmet>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link to="/">북북</Link>
        </div>
        <form onSubmit={onSubmit} className={styles.form} noValidate>
          <input className={styles.input} name="email" type="email" value={email} onChange={onChangeEmail} placeholder="이메일" />
          <input
            className={styles.input}
            name="password"
            type="password"
            value={password}
            onChange={onChangePw}
            autoComplete="off"
            placeholder="비밀번호"
          />
          {error && <span>이메일 또는 비밀번호를 다시 확인해주세요.</span>}
          <input className={styles.submit} disabled={!disabled} type="submit" value="로그인" />
          <button onClick={onClickGoogle}>구글 로그인</button>
        </form>
        <ul className={styles.find}>
          <li>
            <Link to="/find_password">비밀번호 찾기</Link>
          </li>
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
