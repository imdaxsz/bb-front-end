import { debounce } from "lodash";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { checkEmail, requestEmailCerti, verifyCode } from "api/UserApi";

export interface CertificationProps {
  email: string;
  purpose: "signUp" | "resetPw";
}

export default function useCertification({
  email,
  purpose,
}: CertificationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [validateEmail, setValidateEmail] = useState<number | null>(null);
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const navigate = useNavigate();

  const isSignUp = purpose === "signUp";

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  /**
   * @description 인증번호 요청
   */
  const requestMailCode = async () => {
    setIsLoading(true);
    try {
      await requestEmailCerti(email);
      setShowCode(true);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  /**
   * @description 이메일 검사 및 인증번호 요청
   */
  const requestCertifications = debounce(async () => {
    // 이메일 패턴 검사
    const emailReg = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!emailReg.test(email)) {
      setValidateEmail(1);
      return;
    }
    setValidateEmail(0);
    setIsLoading(true);
    try {
      const res = await checkEmail(email);
      // 인증 목적에 따라 조건과 오류 코드를 나눕니다.
      const errorCondition = isSignUp ? res.exists : !res.exists;
      const errorCode = isSignUp ? 2 : 3;
      setIsLoading(false);
      if (errorCondition) {
        setValidateEmail(errorCode);
        return;
      }
      await requestMailCode();
    } catch (error) {
      console.log("Error with check Email: ", error);
    }
    setIsLoading(false);
  }, 300);

  /**
   * @description 사용자가 입력한 인증번호 검증
   */
  const verify = debounce(async () => {
    const redirectUrl =
      purpose === "signUp" ? "/signup/next" : "/find_password/next";
    setIsLoading(true);
    try {
      const res = await verifyCode(email, code);
      if (res) {
        window.alert("인증에 성공하였습니다.");
        navigate(redirectUrl);
      } else {
        window.alert("인증에 실패하였습니다. 다시 시도하세요.");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, 300);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await verify();
  };

  return {
    isLoading,
    validateEmail,
    code,
    onChangeCode,
    showCode,
    requestCertifications,
    onSubmit,
  };
}
