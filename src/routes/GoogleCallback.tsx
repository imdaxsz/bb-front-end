import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { fetch } from "store/authSlice";

export default function GoogleCallback() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userExists = params.get("userExists");
    const token = params.get("token");
    if (userExists) {
      window.alert("이메일로 가입된 계정입니다. 이메일로 로그인 해주세요.");
      navigate("/signin");
      return;
    }
    if (token) {
      dispatch(fetch(token));
      navigate("/");
      return;
    }
    navigate("/404");
  }, [dispatch, location.search, navigate]);

  return <></>;
}
