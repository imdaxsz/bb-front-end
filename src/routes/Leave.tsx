import { debounce } from "lodash";
import { useState, useEffect, FormEvent } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { useSelector } from "react-redux";

import Head from "components/Head";
import Loading from "components/Loading";
import useLeave from "hooks/useLeave";
import useUserInfo from "hooks/useUserInfo";
import { RootState } from "store";
import styles from "styles/my.module.scss";

export default function Leave() {
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);

  const { email, getUserInfo, infoLoading } = useUserInfo();
  const { loading, deleteAccount } = useLeave();

  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setAgree(true);
    else setAgree(false);
  };

  const onSubmit = debounce((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (agree) {
      deleteAccount(password);
    } else window.alert("회원 탈퇴 동의를 체크해 주세요.");
  }, 200);

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [getUserInfo, token]);

  return (
    <div className={styles.wrapper}>
      <Head title="회원탈퇴 | 북북" />
      {(infoLoading || loading) && <Loading />}
      {!infoLoading && (
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
                &nbsp; 위 내용을 이해했으며, 모두 동의합니다.
              </label>
            </div>
            <strong>
              본인 확인을 위해 {email} 계정의 비밀번호를 입력해주세요.
            </strong>
            <form onSubmit={onSubmit} className={styles["delete-form"]}>
              <input
                name="currentPw"
                type="password"
                value={password}
                onChange={onChangePw}
                placeholder="비밀번호 입력"
                autoComplete="off"
                className={styles.input}
              />
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
