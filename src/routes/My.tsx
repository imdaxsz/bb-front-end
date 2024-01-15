import { Link } from "react-router-dom";

import ChangePassword from "components/ChangePassword";
import Head from "components/Head";
import Loader from "components/Loader";
import useSignOut from "hooks/useSignOut";
import useUserInfo from "hooks/useUserInfo";
import styles from "styles/my.module.scss";

export default function My() {
  const {
    email,
    isRecommendActive,
    isOauthUser,
    isLoading,
    onRecommendClick,
    onRequestDataClick,
  } = useUserInfo();
  const { signOut } = useSignOut();

  return (
    <div className={styles.wrapper}>
      <Head title="마이페이지 | 북북" />
      {(isLoading.info || isLoading.backUp) && <Loader />}
      {!isLoading.info && (
        <div className={styles.content}>
          <div className={styles["item-wrapper"]}>
            <span className={styles.title}>이메일</span>
            <span className={styles["user-info"]}>{email}</span>
            <button
              className={styles["btn-white"]}
              onClick={() => signOut("/")}
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
