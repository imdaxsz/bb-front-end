import styles from "../styles/scss/auth.module.scss";

export default function Reset() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <a href="/">북북</a>
        <h4 className={styles.label}>비밀번호 재설정</h4>
        <form>
          <input className={styles.input} required type="password" placeholder="새 비밀번호 입력" />
          <input className={styles.input} required type="password" placeholder="새 비밀번호 확인" />
          <input className={styles.submit} type="submit" value="완료" />
        </form>
      </div>
    </div>
  );
}
