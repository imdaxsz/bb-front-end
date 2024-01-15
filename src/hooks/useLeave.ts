import { useState } from "react";

import { deleteAccount as request } from "api/UserApi";
import { ApiError, handleUnauthorizated } from "lib/error";

import useSignout from "./useSignout";

export default function useLeave() {
  const { signout } = useSignout();
  const [loading, setLoading] = useState(false);

  const deleteAccount = async (password: string) => {
    setLoading(true);
    try {
      await request(password);
      window.alert("탈퇴 완료되었습니다.");
      signout("/");
    } catch (error) {
      if (error instanceof ApiError) {
        handleUnauthorizated(error, "alert");
        if (error.status === 400) window.alert("비밀번호를 다시 확인하세요.");
      }
      console.log(error);
    }
    setLoading(false);
  };

  return { loading, deleteAccount };
}
