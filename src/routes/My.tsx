import styles from "../styles/scss/my.module.scss";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ChangePassword from "../components/ChangePassword";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useSignOut from "../hooks/useSignout";
import useUserInfo from "../hooks/useUserInfo";
import Loading from "../components/Loading";

export default function My() {
  const token = useSelector((state: RootState) => state.auth.token);
  const { email, active, isOauthUser, infoLoading, backUploading, getUserInfo, onRecommendClick, onRequestDataClick } = useUserInfo({ token });
  const { signOut } = useSignOut();

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token, getUserInfo]);

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>북북 - 마이페이지</title>
      </Helmet>
      {(infoLoading || backUploading) && <Loading />}
      {!infoLoading && (
        <div className={styles.content}>
          <div className={styles["item-wrapper"]}>
            <span className={styles.title}>이메일</span>
            <span className={styles["user-info"]}>{email}</span>
            <button className={styles["btn-white"]} onClick={()=>signOut("/")}>
              로그아웃
            </button>
          </div>
          <div className={styles["password-wrapper"]}>
            <div className={styles.title}>비밀번호 재설정</div>
            <div className={styles.password}>
              <ChangePassword token={token} isOauthUser={isOauthUser} />
            </div>
          </div>
          <div className={styles["item-wrapper"]}>
            <span className={styles["title-md"]}>후기 작성 후 책 추천</span>
            <div className={`toggle ${active ? "toggle-active" : ""}`} onClick={() => onRecommendClick()}>
              <div className="circle" />
            </div>
          </div>
          <div className={styles["item-wrapper"]}>
            <span className={styles["title-md"]}>후기 데이터 다운로드</span>
            <button className={styles["btn-primary"]} onClick={() => onRequestDataClick()}>
              데이터 요청하기
            </button>
          </div>
          <div className={styles["item-wrapper"]}>
            <Link to="/leave">회원 탈퇴</Link>
          </div>
        </div>
      )}
    </div>
  );
}
