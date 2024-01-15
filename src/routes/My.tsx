import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ChangePassword from "components/ChangePassword";
import Head from "components/Head";
import Loading from "components/Loading";
import useSignout from "hooks/useSignout";
import useUserInfo from "hooks/useUserInfo";
import { RootState } from "store";
import styles from "styles/my.module.scss";

export default function My() {
  const token = useSelector((state: RootState) => state.auth.token);
  const {
    email,
    isRecommendActive,
    isOauthUser,
    infoLoading,
    backUploading,
    getUserInfo,
    onRecommendClick,
    onRequestDataClick,
  } = useUserInfo();
  const { signout } = useSignout();

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token, getUserInfo]);

  return (
    <div className={styles.wrapper}>
      <Head title="마이페이지 | 북북" />
      {(infoLoading || backUploading) && <Loading />}
      {!infoLoading && (
        <div className={styles.content}>
          <div className={styles["item-wrapper"]}>
            <span className={styles.title}>이메일</span>
            <span className={styles["user-info"]}>{email}</span>
            <button
              className={styles["btn-white"]}
              onClick={() => signout("/")}
            >
              로그아웃
            </button>
          </div>
          <div className={styles["password-wrapper"]}>
            <div className={styles.title}>비밀번호 재설정</div>
            <div className={styles.password}>
              <ChangePassword isOauthUser={isOauthUser} />
            </div>
          </div>
          <div className={styles["item-wrapper"]}>
            <span className={styles["title-md"]}>후기 작성 후 책 추천</span>
            <div
              className={`toggle ${isRecommendActive ? "toggle-active" : ""}`}
              onClick={() => onRecommendClick()}
            >
              <div className="circle" />
            </div>
          </div>
          <div className={styles["item-wrapper"]}>
            <span className={styles["title-md"]}>후기 데이터 다운로드</span>
            <button
              className={styles["btn-primary"]}
              onClick={() => onRequestDataClick()}
            >
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
