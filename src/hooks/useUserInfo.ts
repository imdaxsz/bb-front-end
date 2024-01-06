import { useState, useCallback } from "react";

import { toggleRecommend } from "api/RecommendApi";
import { getUser } from "api/UserApi";
import { handleUnauthorizated } from "lib/error";

import useBackUp from "./useBackUp";

export default function useUserInfo() {
  const [email, setEmail] = useState("");
  const [isRecommendActive, setisRecommendActive] = useState(true);
  const [isOauthUser, setIsOauthUser] = useState(false);
  const [infoLoading, setInfoLoading] = useState(false);
  const [backUploading, setBackUpLoading] = useState(false);

  const { backUp } = useBackUp();

  const getUserInfo = useCallback(async () => {
    setInfoLoading(true);
    try {
      const res = await getUser();
      setEmail(res.email);
      setisRecommendActive(res.recommend);
      setIsOauthUser(res.oauth);
    } catch (error) {
      console.log(error);
      handleUnauthorizated(error);
    }
    setInfoLoading(false);
  }, []);

  const onRecommendClick = async () => {
    try {
      await toggleRecommend();
      setisRecommendActive((prev) => !prev);
    } catch (error) {
      console.log(error);
      handleUnauthorizated(error, "alert");
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
    isRecommendActive,
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
