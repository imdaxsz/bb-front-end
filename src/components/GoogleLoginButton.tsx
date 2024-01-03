import { FcGoogle } from "react-icons/fc";

import styles from "@/styles/auth.module.scss";

export default function GoogleLoginButton() {
  const onClickGoogle = () => {
    const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid email profile`;
  };
  return (
    <button className={styles.google} type="button" onClick={onClickGoogle}>
      <FcGoogle size={20} />
      <span>구글 계정으로 로그인</span>
    </button>
  );
}
