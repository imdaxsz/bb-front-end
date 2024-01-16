import { debounce } from "lodash";
import { useState } from "react";

import { changePassword } from "api/UserApi";
import { ApiError, handleUnauthorizated } from "lib/error";
import { checkPassword } from "utils/checkPassword";

export default function useChangePassword() {
  const [form, setForm] = useState({
    currentPw: "",
    newPw: "",
    confirmPw: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validatePw, setValidatePw] = useState<boolean | null>(null);
  const [isSamePw, setIsSamePw] = useState<boolean | null>(null);

  const [error, setError] = useState(0);
  const errorMessage = [
    "",
    "비밀번호를 정확하게 입력해주세요.",
    "현재 비밀번호와 같은 비밀번호는 사용할 수 없습니다.",
  ];

  const isButtonDisabled =
    form.currentPw.trim().length === 0 ||
    form.newPw.trim().length === 0 ||
    form.confirmPw.trim().length === 0;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "confirmPw") setIsSamePw(form.newPw === value);
  };

  const onBlur = () => setValidatePw(checkPassword(form.newPw));

  const handleForm = debounce(async () => {
    const sameCurrentPw = form.newPw === form.currentPw && form.newPw !== "";
    // 현재 비밀번호와 동일 비밀번호인가
    if (sameCurrentPw) {
      setError(2);
      return;
    }
    if (validatePw && isSamePw && !sameCurrentPw) {
      setIsLoading(true);
      try {
        await changePassword(form.currentPw, form.newPw);
        window.alert("비밀번호 변경이 완료되었습니다.");
        window.location.reload();
      } catch (error) {
        console.log(error);
        if (error instanceof ApiError && error.status === 400) setError(1);
        handleUnauthorizated(error, "alert");
      }
      setIsLoading(false);
    }
  }, 300);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleForm();
  };

  return {
    form,
    validatePw,
    isSamePw,
    error,
    errorMessage,
    isButtonDisabled,
    onChange,
    onBlur,
    onSubmit,
    isLoading,
  };
}
