import { Link } from "react-router-dom";

import GoogleLoginButton from "components/GoogleLoginButton";
import Head from "components/Head";
import useSignIn from "hooks/useSignIn";
import styles from "styles/auth.module.scss";

export default function SignIn() {
  const { form, error, isButtonDisabled, onChange, onSubmit } = useSignIn();

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
            value={form.email}
            onChange={onChange}
            placeholder="이메일"
          />
          <input
            className={styles.input}
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            autoComplete="off"
            placeholder="비밀번호"
          />
          {error && <span>이메일 또는 비밀번호를 다시 확인해주세요.</span>}
          <input
            className={styles.submit}
            disabled={isButtonDisabled}
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
