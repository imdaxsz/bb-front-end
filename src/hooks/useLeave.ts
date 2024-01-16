import { debounce } from "lodash";
import { useState } from "react";

import { deleteAccount as request } from "api/UserApi";
import { ApiError, handleUnauthorizated } from "lib/error";

import useSignOut from "./useSignOut";

export default function useLeave() {
  const { signOut } = useSignOut();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setAgree(true);
    else setAgree(false);
  };

  const deleteAccount = async (password: string) => {
    setIsLoading(true);
    try {
      await request(password);
      window.alert("탈퇴 완료되었습니다.");
      signOut("/");
    } catch (error) {
      if (error instanceof ApiError) {
        handleUnauthorizated(error, "alert");
        if (error.status === 400) window.alert("비밀번호를 다시 확인하세요.");
      }
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleForm = debounce(async () => {
    if (agree) {
      await deleteAccount(password);
    } else window.alert("회원 탈퇴 동의를 체크해 주세요.");
  }, 300);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleForm();
  };

  return {
    leaveInProgress: isLoading,
    password,
    onChangePw,
    onChangeCheck,
    onSubmit,
  };
}
