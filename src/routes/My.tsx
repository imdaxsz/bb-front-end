import styles from "../styles/scss/my.module.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { signOut } from "../utils/SignOut";
import ResetPassword from "../components/ResetPassword";
import { backUp } from "../utils/backUp";

export default function My() {
  const [active, setActive] = useState(true);
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("token");

  const onRecommendClick = () => {
    api
      .post(
        `/api/recommend`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) setActive((prev) => !prev);
      });
  };

  const onRequestDataClick = async () => {
    const ok = window.confirm("후기 데이터를 요청하시겠습니까?");
    if (ok) {
      backUp(token);
    }
  };

  useEffect(() => {
    if (token) {
      api
        .get(`/api/user/info`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setEmail(res.data.email);
          }
        });
      api
        .get(`/api/recommend`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setActive(!res.data);
          }
        });
    }
  }, [token]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles["item-wrapper"]}>
          <span className={styles.title}>이메일</span>
          <span className={styles["user-info"]}>{email}</span>
          <button className={styles["btn-white"]} onClick={signOut}>
            로그아웃
          </button>
        </div>
        <div className={styles["password-wrapper"]}>
          <div className={styles.title}>비밀번호 재설정</div>
          <div className={styles.password}>
            <ResetPassword token={token} />
          </div>
        </div>
        <div className={styles["item-wrapper"]}>
          <span className={styles["title-md"]}>후기 작성 후 책 추천</span>
          <div className={`toggle ${active ? "toggle-active" : ""}`} onClick={onRecommendClick}>
            <div className="circle" />
          </div>
        </div>
        <div className={styles["item-wrapper"]}>
          <span className={styles["title-md"]}>후기 데이터 다운로드</span>
          <button className={styles["btn-primary"]} onClick={onRequestDataClick}>
            데이터 요청하기
          </button>
        </div>
        <div className={styles["item-wrapper"]}>
          <Link to="/leave">회원 탈퇴</Link>
        </div>
      </div>
    </div>
  );
}
