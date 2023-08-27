import btnstyles from "../styles/scss/my.module.scss";
import styles from "../styles/scss/auth.module.scss";
import { useState } from "react";
import api from "../api/api";

export default function ResetPassword({ token }: { token: string | null }) {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  const [validatePw, setValidatePw] = useState<boolean | null>(null);
  const [isSamePw, setIsSamePw] = useState<boolean | null>(null);

  const [error, setError] = useState(0);
  const message = ["", "비밀번호를 정확하게 입력해주세요.", "현재 비밀번호와 같은 비밀번호는 사용할 수 없습니다."];
  const disabled = currentPw !== "" && newPw !== "" && pwConfirm !== "";

  const onChangeCurrentPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPw(e.target.value);
  };

  const onChangeNewPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPw(e.target.value);
  };

  const onChangeConfirmPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwConfirm(e.target.value);
    if (newPw !== e.target.value) setIsSamePw(false);
    else setIsSamePw(true);
  };

  const checkPassword = () => {
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    if (passwordReg.test(newPw)) setValidatePw(true);
    else setValidatePw(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(0);
    if (newPw !== pwConfirm) setIsSamePw(false);
    else setIsSamePw(true);
    if (newPw === currentPw && newPw !== "") setError(2);
    else if (validatePw && isSamePw && error === 0) {
      api
        .put(
          "/api/user/change_password",
          { currentPw, newPw },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200 && res.data !== "PW Error") {
            window.alert("비밀번호 변경이 완료되었습니다.");
            window.location.reload();
          } else setError(1);
        });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className={styles.input}
        name="currentPw"
        type="password"
        value={currentPw}
        onChange={onChangeCurrentPw}
        autoComplete="off"
        placeholder="현재 비밀번호"
      />
      <input
        className={`${styles.input} ${validatePw === false && styles.error}`}
        name="newPw"
        type="password"
        value={newPw}
        onChange={onChangeNewPw}
        onBlur={checkPassword}
        autoComplete="off"
        placeholder="새 비밀번호"
      />
      {validatePw === false && <span>새 비밀번호: 8~16자의 영문, 숫자를 사용해 주세요.</span>}
      <input
        className={`${styles.input} ${isSamePw === false && styles.error}`}
        name="pwConfirm"
        type="password"
        value={pwConfirm}
        onChange={onChangeConfirmPw}
        autoComplete="off"
        placeholder="새 비밀번호 확인"
      />
      {isSamePw === false && <span>비밀번호가 일치하지 않습니다.</span>}
      {error !== 0 && <span>{message[error]}</span>}
      <button disabled={!disabled} type="submit" className={btnstyles["btn-secondary"]}>
        변경
      </button>
    </form>
  );
}
