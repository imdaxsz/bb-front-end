import { Link } from "react-router-dom";
import styles from "../styles/auth.module.scss";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>북북 - 존재하지 않는 페이지</title>
      </Helmet>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link to="/">북북</Link>
        </div>
        <div className="guide">
          <p style={{ fontSize: "24px", fontWeight: "600", margin: "20px" }}>존재하지 않는 페이지입니다.</p>
          <p style={{ fontSize: "16px", color: "#888" }}>주소를 다시 확인해 주세요.</p>
          <Link to="/" className="btn btn-light" style={{ width: "fit-content", margin: "70px" }}>
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
