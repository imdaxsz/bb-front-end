import styles from "../styles/scss/auth.module.scss";

export default function LogIn() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <a href="/">북북</a>
        <form>
          <input className={styles.input} required placeholder="아이디" />
          <input className={styles.input} required type="password" placeholder="비밀번호" />
          <input className={styles.submit} required type="submit" value="로그인" />
        </form>
        <ul className={styles.find}>
          <li>
            <a href="/find_id">아이디 찾기</a>
          </li>
          <li>
            <a href="/find_password">비밀번호 찾기</a>
          </li>
          <li>
            <a href="/join">회원가입</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
