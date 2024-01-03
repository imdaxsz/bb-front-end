import { useState } from "react";

import api, { isAxiosError, AxiosError } from "api";

import useSignOut from "./useSignout";

export default function useLeave() {
  const { signOut } = useSignOut();
  const [loading, setLoading] = useState(false);

  const deleteAccount = async (password: string, token: string | null) => {
    setLoading(true);
    try {
      const res = await api.post(
        "/api/user/delete_account",
        { password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setLoading(false);
      if (res.status === 200 && res.data !== "ID or PW error!") {
        window.alert("탈퇴 완료되었습니다.");
        signOut();
      } else window.alert("비밀번호를 다시 확인하세요.");
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 403)
          signOut();
      }
      setLoading(false);
      console.log(error);
    }
  };

  return { loading, deleteAccount };
}
