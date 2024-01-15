import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { reset } from "store/authSlice";

export default function useSignout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signout = useCallback(
    (url?: string) => {
      dispatch(reset());
      if (url) navigate(url);
    },
    [dispatch, navigate],
  );

  return { signout };
}
