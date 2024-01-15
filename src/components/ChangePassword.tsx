import { debounce } from "lodash";
import { useState } from "react";

import { changePassword } from "api/UserApi";
import { handleUnauthorizated } from "lib/error";
import styles from "styles/auth.module.scss";
import btnstyles from "styles/my.module.scss";

import Loading from "./Loading";

export default function ChangePassword({
  isOauthUser,
}: {
  isOauthUser: boolean;
}) {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  const [validatePw, setValidatePw] = useState<boolean | null>(null);
  const [isSamePw, setIsSamePw] = useState<boolean | null>(null);

  const [error, setError] = useState(0);
  const message = [
    "",
    "비밀번호를 정확하게 입력해주세요.",
    "현재 비밀번호와 같은 비밀번호는 사용할 수 없습니다.",
  ];
  const disabled = currentPw !== "" && newPw !== "" && pwConfirm !== "";

  const [loading, setLoading] = useState(false);

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

  const onSubmit = debounce(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sameCurrentPw = newPw === currentPw && newPw !== "";
    // 현재 비밀번호와 동일 비밀번호인가
    if (sameCurrentPw) setError(2);
    else if (validatePw && isSamePw && !sameCurrentPw) {
      setLoading(true);
      try {
        const res = await changePassword(currentPw, newPw);
        if (res !== "PW Error") {
          window.alert("비밀번호 변경이 완료되었습니다.");
          window.location.reload();
        } else setError(1);
      } catch (error) {
        console.log(error);
        handleUnauthorizated(error, "alert");
      }
      setLoading(false);
    }
  }, 200);

  return (
    <form onSubmit={onSubmit}>
      {loading && <Loading />}
      <input
        className={styles.input}
        name="currentPw"
        type="password"
        value={currentPw}
        onChange={onChangeCurrentPw}
        autoComplete="off"
        placeholder="현재 비밀번호"
        disabled={isOauthUser}
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
        disabled={isOauthUser}
      />
      {validatePw === false && (
        <span>새 비밀번호: 8~16자의 영문, 숫자를 사용해 주세요.</span>
      )}
      <input
        className={`${styles.input} ${isSamePw === false && styles.error}`}
        name="pwConfirm"
        type="password"
        value={pwConfirm}
        onChange={onChangeConfirmPw}
        autoComplete="off"
        placeholder="새 비밀번호 확인"
        disabled={isOauthUser}
      />
      {isSamePw === false && <span>비밀번호가 일치하지 않습니다.</span>}
      {error !== 0 && <span>{message[error]}</span>}
      <button
        disabled={!disabled}
        type="submit"
        className={btnstyles["btn-primary"]}
      >
        변경
      </button>
    </form>
  );
}
