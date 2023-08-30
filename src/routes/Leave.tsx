import styles from "../styles/scss/my.module.scss";
import { useState, useEffect, FormEvent } from "react";
import api from "../api/api";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useSignOut } from "../hooks/useSignout";

export default function Leave() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const { onClickSignout } = useSignOut();

  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setAgree(true);
    else setAgree(false);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (agree) {
      api
        .post(
          "/api/user/delete_account",
          { password },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200 && res.data !== "ID or PW error") {
            window.alert("탈퇴 완료되었습니다.");
            onClickSignout();
          } else window.alert("비밀번호를 다시 확인하세요.");
        });
    } else window.alert("회원 탈퇴 동의를 체크해 주세요.");
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
    }
  }, [token]);

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>북북 - 회원탈퇴</title>
      </Helmet>
      <div className={styles.content}>
        <div className={styles.leave}>
          <h4>회원 탈퇴</h4>
          <p>
            <span className={styles.icon}>✔</span>&nbsp;&nbsp;탈퇴할 경우 복구가 불가능합니다.
          </p>
          <p>
            <span className={styles.icon}>✔</span>&nbsp;&nbsp;탈퇴 후 회원정보 및 서비스 이용기록(후기/관심 도서)는 모두 삭제됩니다.
          </p>
          <div className={styles.message}>
            <input type="checkbox" onChange={onChangeCheck} />
            <span>&nbsp; 위 내용을 이해했으며, 모두 동의합니다.</span>
          </div>
          <strong>본인 확인을 위해 {email} 계정의 비밀번호를 입력해주세요.</strong>
          <form onSubmit={onSubmit} className={styles.pform}>
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
    </div>
  );
}
