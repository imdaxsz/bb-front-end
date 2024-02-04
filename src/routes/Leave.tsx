import { AiOutlineCheck } from "react-icons/ai";

import Head from "components/Head";
import Loader from "components/Loader";
import useLeave from "hooks/useLeave";
import useUserInfo from "hooks/useUserInfo";
import styles from "styles/my.module.scss";

export default function Leave() {
  const { email, isOauthUser, isLoading } = useUserInfo();
  const { leaveInProgress, password, onChangePw, onChangeCheck, onSubmit } =
    useLeave();

  return (
    <div className={styles.wrapper}>
      <Head title="회원탈퇴 | 북북" />
      {(isLoading.info || leaveInProgress) && <Loader />}
      {!isLoading.info && (
        <div className={styles.content}>
          <div className={styles.leave}>
            <h4>회원 탈퇴</h4>
            <div className={styles.inform}>
              <div className={styles.icon}>
                <AiOutlineCheck strokeWidth="100" />
              </div>
              <span>탈퇴할 경우 복구가 불가능합니다.</span>
            </div>
            <div className={styles.inform}>
              <div className={styles.icon}>
                <AiOutlineCheck strokeWidth="100" />
              </div>
              <span>
                탈퇴 후 회원정보 및 서비스 이용기록(후기/관심 도서)는 모두
                삭제됩니다.
              </span>
            </div>
            <div className={styles.message}>
              <input id="agree" type="checkbox" onChange={onChangeCheck} />
              <label htmlFor="agree">
                &nbsp; 위 내용을 확인했으며, 이에 동의합니다.
              </label>
            </div>
            <form onSubmit={onSubmit} className={styles["delete-form"]}>
              {!isOauthUser && (
                <>
                  <strong>
                    본인 확인을 위해 {email} 계정의 비밀번호를 입력해주세요.
                  </strong>
                  <input
                    name="currentPw"
                    type="password"
                    value={password}
                    onChange={onChangePw}
                    placeholder="비밀번호 입력"
                    autoComplete="off"
                    className={styles.input}
                  />
                </>
              )}
              <button type="submit" className={styles["btn-primary"]}>
                회원 탈퇴
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
