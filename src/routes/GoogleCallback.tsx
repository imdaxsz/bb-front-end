import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signin } from "../store/authSlice";
import { useEffect } from "react";

export default function GoogleCallback() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const userExists = params.get("userExists");
  const token = params.get("token");

  useEffect(() => {
    if (token && !userExists) {
      dispatch(signin(token));
      console.log(token);
      navigate("/");
    } else navigate("/404");
    if (userExists) {
      window.alert("이메일 가입한 회원입니다. 이메일로 로그인 해주세요.");
      navigate("/signin");
    }
  }, [dispatch, navigate, token, userExists]);

  return (
    <div>
      <h2>Callback</h2>
    </div>
  );
}
