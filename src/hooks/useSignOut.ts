import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { reset } from "store/authSlice";

export default function useSignOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = useCallback(
    (url?: string) => {
      dispatch(reset());
      if (url) navigate(url);
    },
    [dispatch, navigate],
  );

  return { signOut };
}
