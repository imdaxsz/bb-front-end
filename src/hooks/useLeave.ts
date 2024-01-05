import { useState } from "react";

import { deleteAccount as request } from "api/UserApi";
import { ApiError } from "lib/error";

import useSignOut from "./useSignout";

export default function useLeave() {
  const { signOut } = useSignOut();
  const [loading, setLoading] = useState(false);

  const deleteAccount = async (password: string) => {
    setLoading(true);
    try {
      await request(password);
      window.alert("탈퇴 완료되었습니다.");
      signOut("/");
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 400) window.alert("비밀번호를 다시 확인하세요.");
      }
      console.log(error);
    }
    setLoading(false);
  };

  return { loading, deleteAccount };
}
