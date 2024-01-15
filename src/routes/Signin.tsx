import { debounce } from "lodash";
import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { signIn } from "api/UserApi";
import GoogleLoginButton from "components/GoogleLoginButton";
import Head from "components/Head";
import { ApiError } from "lib/error";
import { signin } from "store/authSlice";
import styles from "styles/auth.module.scss";

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

  const onSubmit = debounce(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    if (email.length <= 0) setBlankEmail(true);
    else if (password.length <= 0) setBlankPw(true);
    if (!blankEmail && !blankPw) {
      try {
        const res = await signIn(email, password);
        if (res.token) {
          dispatch(signin(res.token));
          navigate("/");
        }
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 409)
            window.alert(
              "구글 연동으로 가입된 계정입니다. 구글 로그인을 이용해주세요.",
            );
          if (error.status === 400) setError(true);
        }
        console.log(error);
      }
    }
  }, 200);

  return (
    <div className={styles.wrapper}>
      <Head title="로그인 | 북북" />
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link to="/">북북</Link>
        </div>
        <form onSubmit={onSubmit} className={styles.form} noValidate>
          <input
            className={styles.input}
            name="email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="이메일"
          />
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
          <input
            className={styles.submit}
            disabled={!disabled}
            type="submit"
            value="로그인"
          />
        </form>
        <ul className={styles.find}>
          <li>
            <Link to="/find_password">비밀번호 찾기</Link>
          </li>
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
        </ul>
        <GoogleLoginButton />
      </div>
    </div>
  );
}
