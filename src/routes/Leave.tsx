import styles from "../styles/scss/my.module.scss";
import { useState, useEffect, FormEvent } from "react";
import api, { isAxiosError, AxiosError } from "../api/api";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useSignOut from "../hooks/useSignout";
import { AiOutlineCheck } from "react-icons/ai";
import Loading from "../components/Loading";

export default function Leave() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const { signOut } = useSignOut();
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      try {
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
            setLoading(false);
            if (res.status === 200 && res.data !== "ID or PW error") {
              window.alert("탈퇴 완료되었습니다.");
              signOut();
            } else window.alert("비밀번호를 다시 확인하세요.");
          });
      } catch (error) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response.status === 403) signOut();
        }
        setLoading(false);
        console.log(error);
      }
    } else window.alert("회원 탈퇴 동의를 체크해 주세요.");
  };

  useEffect(() => {
    if (token) {
      setLoading(true);
      try {
        api
          .get(`/api/user/info`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) setEmail(res.data.email);
            setLoading(false);
          });
      } catch (error) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response.status === 403) signOut();
        }
        setLoading(false);
        console.log(error);
      }
    }
  }, [signOut, token]);

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>북북 - 회원탈퇴</title>
      </Helmet>
      {loading && <Loading />}
      {!loading && (
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
              <span>탈퇴 후 회원정보 및 서비스 이용기록(후기/관심 도서)는 모두 삭제됩니다.</span>
            </div>
            <div className={styles.message}>
              <input type="checkbox" onChange={onChangeCheck} />
              <span>&nbsp; 위 내용을 이해했으며, 모두 동의합니다.</span>
            </div>
            <strong>본인 확인을 위해 {email} 계정의 비밀번호를 입력해주세요.</strong>
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
