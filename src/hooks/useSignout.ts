import { useDispatch } from "react-redux";
import { signout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export const useSignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickSignout = () => {
    dispatch(signout());
    navigate("/");
    
  };

  return { onClickSignout };
};
