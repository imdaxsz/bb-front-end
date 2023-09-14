import { useDispatch } from "react-redux";
import { signout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useSignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const Signout = useCallback(() => {
   dispatch(signout());
   navigate("/");
 }, [dispatch, navigate]);

  return { Signout };
};
