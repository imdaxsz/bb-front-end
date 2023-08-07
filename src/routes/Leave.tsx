import styles from "../styles/scss/my.module.scss";
import { useState, FormEvent } from "react";
import api from "../api/api";

export default function Leave() {
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setAgree(true);
    else setAgree(false);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (agree) {
      api.post("/api/user/deleteAccount", { id: "id", password }).then((res) => {
        if (res.status === 400) window.alert("비밀번호를 다시 확인하세요.");
        else if (res.status === 200) {
          window.alert("탈퇴 완료되었습니다.");
          // 로그아웃
        }
      });
    } else window.alert("회원 탈퇴 동의를 체크해 주세요.");
  };

  return (
    <div className={styles.wrapper}>
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
          <strong>본인 확인을 위해 'id' 계정의 비밀번호를 입력해주세요.</strong>
          <form onSubmit={onSubmit} className={styles.pform}>
            <input name="currentPw" type="password" value={password} onChange={onChangePw} placeholder="비밀번호 입력" autoComplete="off" className={styles.input} />
            <button type="submit" className={styles["btn-primary"]}>
              회원 탈퇴
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
