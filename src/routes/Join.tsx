import styles from "../styles/scss/auth.module.scss";

export default function Join() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <a href="/">북북</a>
        <form>
          <input className={styles.input} required placeholder="아이디" />
          <input className={styles.input} required type="email" placeholder="이메일" />
          <input className={styles.input} required type="password" placeholder="비밀번호" />
          <input className={styles.input} required type="password" placeholder="비밀번호 확인" />
          <input className={styles.submit} type="submit" value="가입하기" />
        </form>
      </div>
    </div>
  );
}