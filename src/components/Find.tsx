import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/scss/auth.module.scss";

export default function Find() {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <a href="/">북북</a>
        {pathname === "/find_id" && (
          <>
            <h4 className={styles.label}>등록된 이메일로 찾기</h4>
            <form>
              <input className={styles.input} required type="email" placeholder="이메일" />
              <input className={styles.submit} type="submit" value="아이디 찾기" />
            </form>
          </>
        )}
        {pathname === "/find_password" && (
          <>
            <h4 className={styles.label}>계정 정보를 입력해주세요.</h4>
            <form onSubmit={() => navigate("/reset_password")}>
              <input className={styles.input} required placeholder="아이디" />
              <input className={styles.input} required type="email" placeholder="이메일" />
              <input className={styles.submit} type="submit" value="다음" />
            </form>
          </>
        )}
      </div>
    </div>
  );
}
