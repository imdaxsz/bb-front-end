import { useState, useCallback } from "react";

import { toggleRecommend } from "api/RecommendApi";
import { getUser } from "api/UserApi";

import useBackUp from "./useBackUp";

export default function useUserInfo({ token }: { token: string | null }) {
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(true);
  const [isOauthUser, setIsOauthUser] = useState(false);
  const [infoLoading, setInfoLoading] = useState(Boolean(token));
  const [backUploading, setBackUpLoading] = useState(false);

  const { backUp } = useBackUp();

  const getUserInfo = useCallback(async () => {
    try {
      const res = await getUser();
      setEmail(res.email);
      setActive(res.recommend);
      setIsOauthUser(res.oauth);
    } catch (error) {
      console.log(error);
    }
    setInfoLoading(false);
  }, []);

  const onRecommendClick = async () => {
    try {
      await toggleRecommend();
      setActive((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const onRequestDataClick = async () => {
    const ok = window.confirm("후기 데이터를 요청하시겠습니까?");
    if (ok) {
      setBackUpLoading(true);
      await backUp();
      setBackUpLoading(false);
    }
  };

  return {
    active,
    setActive,
    email,
    setEmail,
    isOauthUser,
    infoLoading,
    backUploading,
    getUserInfo,
    onRecommendClick,
    onRequestDataClick,
  };
}
