import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Loading from "../components/Loading";

export default function GoogleRedirect() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 1. 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

  // 2. 인가코드 서버에 보내면서 로그인 or 회원가입 요청
  const googleLogin = useCallback(async (code: string) => {
    const res = await api.get(`/auth/google?code=${code}`);
    navigate(res.data);
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (code) {
      setLoading(true);
      googleLogin(code);
    }
  }, [code, googleLogin]);

  return <>{loading && <Loading />}</>;
}
