import { debounce } from "lodash";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signIn as request } from "api/UserApi";
import { ApiError } from "lib/error";
import { fetch } from "store/authSlice";

export default function useSignin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isButtonDisabled =
    form.email.trim().length === 0 || form.password.trim().length === 0;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await requestSignin();
  };

  const requestSignin = debounce(async () => {
    if (isButtonDisabled) {
      window.alert("아이디, 비밀번호를 입력해 주세요!");
      return;
    }

    setError(false);
    try {
      const res = await request(form.email, form.password);
      if (res.token) {
        dispatch(fetch(res.token));
        navigate("/");
      }
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 409)
          window.alert(
            "구글 연동으로 가입된 계정입니다. 구글 로그인을 이용해주세요.",
          );
        if (error.status === 400) setError(true);
      }
      console.log(error);
    }
  }, 300);

  return { form, error, isButtonDisabled, onChange, onSubmit };
}
