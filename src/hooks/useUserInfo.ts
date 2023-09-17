import api from "../api/api";
import { useState } from "react";
import { useCallback } from "react";
import { setRecommend } from "../utils/recommend";
import useSignOut from "./useSignout";
import useBackUp from "./useBackUp";

export default function useUserInfo({ token }: { token: string | null }) {
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(true);
  const [isOauthUser, setIsOauthUser] = useState(false);
  const [infoLoading, setInfoLoading] = useState(Boolean(token));
  const [backUploading, setBackUpLoading] = useState(false);

  const { signOut } = useSignOut();
  const { backUp } = useBackUp();

  const getUserInfo = useCallback(async () => {
    const res = await api.get(`/api/user/info`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setInfoLoading(false);
    if (res.status === 200) {
      setEmail(res.data.email);
      setActive(res.data.recommend);
      setIsOauthUser(res.data.oauth);
    }
    if (res.status === 403) signOut();
  }, [signOut, token]);

  const onRecommendClick = async () => {
    const res = await setRecommend(token);
    if (res === 200) setActive((prev) => !prev);
    else if (res === 403) signOut();
  };

  const onRequestDataClick = async () => {
    const ok = window.confirm("후기 데이터를 요청하시겠습니까?");
    if (ok) {
      setBackUpLoading(true);
      await backUp(token);
      setBackUpLoading(false);
    }
  };

  return { active, setActive, email, setEmail, isOauthUser, infoLoading, backUploading, getUserInfo, onRecommendClick, onRequestDataClick };
}
