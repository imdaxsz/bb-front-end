import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "@/api";
import Loading from "@/components/Loading";
import styles from "@/styles/auth.module.scss";

interface Props {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function EmailCertiForSignUp({ email, setEmail }: Props) {
  const [validateEmail, setValidateEmail] = useState<number | null>(null);
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const requestCertifications = () => {
    const emailReg = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (emailReg.test(email)) {
      // 패턴 검사
      setValidateEmail(0);
      setLoading(true);
      api.post("/api/user/checkemail", { email }).then((res) => {
        setLoading(false);
        if (res.status === 200 && res.data.exists) setValidateEmail(2);
        if (res.status === 200 && !res.data.exists) {
          // 인증 메일 요청
          setLoading(true);
          api.post("/api/certification/send-email", { email }).then((res) => {
            if (res.status === 200) setShowCode(true);
            else console.log(res.status, " server error");
            setLoading(false);
          });
        }
      });
    } else setValidateEmail(1);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    api
      .post("/api/certification/verify-code", { email, userCode: code })
      .then((res) => {
        if (res.status === 200 && res.data) {
          window.alert("인증에 성공하였습니다.");
          navigate("/signup/next");
        } else {
          window.alert("인증에 실패하였습니다. 다시 시도하세요.");
          window.location.reload();
        }
        setLoading(false);
      });
  };

  return (
    <form onSubmit={onSubmit} className={styles.form} noValidate>
      {loading && <Loading />}
      <input
        className={`${styles.input} ${
          (validateEmail === 1 || validateEmail === 2) && styles.error
        }`}
        name="email"
        type="email"
        value={email}
        onChange={onChangeEmail}
        placeholder="이메일"
      />
      {validateEmail === 1 && <span>이메일: 올바르지 않은 형식입니다.</span>}
      {validateEmail === 2 && <span>이미 사용중인 이메일입니다.</span>}
      {showCode ? (
        <>
          <input
            className={`${styles.input}`}
            name="code"
            type="text"
            value={code}
            onChange={onChangeCode}
            placeholder="인증번호"
          />
          <span
            style={{ textAlign: "center", color: "#888", marginTop: "5px" }}
          >
            인증번호가 메일로 발송되었습니다.
            <br />
            30분 안에 인증번호를 입력해 주세요.
          </span>
          <input
            className={styles.submit}
            type="submit"
            value="인증번호 확인"
          />
        </>
      ) : (
        <input
          className={styles.submit}
          onClick={requestCertifications}
          type="button"
          value="인증번호 요청"
          disabled={email === ""}
        />
      )}
    </form>
  );
}
