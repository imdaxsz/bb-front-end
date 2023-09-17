import { useDispatch } from "react-redux";
import { signout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export default function useSignOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = useCallback(
    (url?: string) => {
      dispatch(signout());

      if (url) navigate("/");
      else navigate("/signin");
    },
    [dispatch, navigate]
  );

  return { signOut };
}
