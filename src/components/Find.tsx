import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/scss/auth.module.scss";

export default function Find() {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link to="/">북북</Link>
        </div>
        {pathname === "/find_password" && (
          <>
            <h4 className={styles["label-sm"]}>계정 이메일을 입력해주세요.</h4>
            <form onSubmit={() => navigate("/reset_password")}>
              <input className={styles.input} required type="email" placeholder="이메일" />
              <input className={styles.submit} type="submit" value="다음" />
            </form>
          </>
        )}
      </div>
    </div>
  );
}
