import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signout } from "store/authSlice";

export default function useSignOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = useCallback(
    (url?: string) => {
      dispatch(signout());

      if (url) navigate(url);
      else navigate("/signin");
    },
    [dispatch, navigate],
  );

  return { signOut };
}
