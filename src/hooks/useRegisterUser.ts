import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  checkCertiStatus,
  signUp as signUpRequest,
  resetPassword as resetPwRequest,
} from "api/UserApi";
import { checkPassword as isValidate } from "utils/checkPassword";

export default function useRegisterUser({ newUser }: { newUser: boolean }) {
  const [form, setForm] = useState({ email: "", password: "", confirmPw: "" });
  const [validatePw, setValidatePw] = useState<boolean | null>(null);
  const [isSamePw, setIsSamePw] = useState<boolean | null>(null); // 비밀번호, 비밀번호 확인 일치 여부
  const [isLoading, setIsLoading] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isButtonDisabled =
    form.password.trim().length === 0 || form.confirmPw.trim().length === 0;

  /**
   * @description 비밀번호 정규식 검사
   */
  const checkPassword = () => {
    setValidatePw(isValidate(form.password));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "confirmPw") setIsSamePw(form.password === value);
  };

  const signUp = async () => {
    await signUpRequest(form.email, form.password);
    window.alert("가입이 완료되었습니다!");
  };

  const resetPassword = async () => {
    await resetPwRequest(form.email, form.password);
    window.alert("비밀번호 재설정이 완료되었습니다!");
  };

  const handleForm = debounce(async () => {
    if (isButtonDisabled) {
      window.alert("이메일, 비밀번호를 입력해 주세요!");
      return;
    }

    if (validatePw && isSamePw) {
      try {
        setIsLoading(true);
        newUser ? await signUp() : await resetPassword();
        navigate("/signin");
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  }, 300);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleForm();
  };

  /**
   * @description 유효한 접근인지(이메일이 인증되었는지) 검사
   */
  const checkValidation = useCallback(
    async (email: string) => {
      const redirectUrl = newUser ? "/signup" : "/find_password";
      try {
        const res = await checkCertiStatus(email);
        if (!res) navigate(redirectUrl);
      } catch (error) {
        console.log(error);
        navigate(redirectUrl);
      }
    },
    [navigate, newUser],
  );

  useEffect(() => {
    if (["/signup/next", "/find_password/next"].includes(pathname)) {
      // 인증 상태 요청
      if (form.email === "") {
        navigate(pathname.slice(0, -5));
        return;
      }
      checkValidation(form.email);
    }
  }, [checkValidation, form.email, navigate, pathname]);

  return {
    isLoading,
    form,
    isButtonDisabled,
    checkPassword,
    onChange,
    onSubmit,
    checkValidation,
    validatePw,
    isSamePw,
  };
}
