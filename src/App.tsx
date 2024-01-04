import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { verifyToken as request } from "api/UserApi";
import Router from "routes";

import useSignOut from "./hooks/useSignout";
import { RootState } from "./store";
import { setIsAuthenticated } from "./store/authSlice";

export default function App() {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const { signOut } = useSignOut();

  const verifyToken = useCallback(async () => {
    try {
      const res = await request();
      dispatch(setIsAuthenticated(res.valid));
      if (!res.valid) signOut("/");
    } catch (error) {
      console.log(error);
      signOut("/");
    }
  }, [dispatch, signOut]);

  useEffect(() => {
    // 토큰 검증
    if (token) {
      verifyToken();
    }
  }, [token, verifyToken]);

  return <Router />;
}
