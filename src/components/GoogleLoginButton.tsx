import styles from "../styles/scss/auth.module.scss";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  const onClickGoogle = () => {
    window.location.href = `${process.env.REACT_APP_API_ROOT}/auth/google`;
  };

  return (
    <button className={styles.google} type="button" onClick={onClickGoogle}>
      <FcGoogle size={20} />
      <span>구글 계정으로 로그인</span>
    </button>
  );
}
