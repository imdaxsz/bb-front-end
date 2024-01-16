import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { googleLogin as request } from "api/UserApi";
import Loader from "components/Loader";

export default function GoogleRedirect() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 1. 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

  // 2. 인가코드 서버에 보내면서 로그인 or 회원가입 요청
  const googleLogin = useCallback(
    async (code: string) => {
      try {
        const res = await request(code);
        navigate(res);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    },
    [navigate],
  );

  useEffect(() => {
    if (code) {
      setLoading(true);
      googleLogin(code);
    }
  }, [code, googleLogin]);

  return <>{loading && <Loader />}</>;
}
