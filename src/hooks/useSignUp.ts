import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { checkCertiStatus, signUp } from "api/UserApi";

export default function useSignUp() {
  const [form, setForm] = useState({ email: "", password: "", confirmPw: "" });
  const [validatePw, setValidatePw] = useState<boolean | null>(null);
  const [isSamePw, setIsSamePw] = useState<boolean | null>(null);

  const navigate = useNavigate();

  const isButtonDisabled =
    form.password.trim().length === 0 || form.confirmPw.trim().length === 0;

  const checkPassword = () => {
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    setValidatePw(passwordReg.test(form.password));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "confirmPw") setIsSamePw(form.password === value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleForm();
  };

  const handleForm = debounce(async () => {
    if (isButtonDisabled) {
      window.alert("아이디, 비밀번호를 입력해 주세요!");
      return;
    }

    if (validatePw && isSamePw) {
      try {
        await signUp(form.email, form.password);
        window.alert("가입이 완료되었습니다!");
        navigate("/signin");
      } catch (error) {
        console.log(error);
      }
    }
  }, 300);

  const checkValidation = useCallback(
    async (email: string) => {
      try {
        await checkCertiStatus(email);
      } catch (error) {
        console.log(error);
        navigate("/signup");
      }
    },
    [navigate],
  );

  return {
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
