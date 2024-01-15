import { debounce } from "lodash";
import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import { toggleRecommend } from "api/RecommendApi";
import { getUser } from "api/UserApi";
import { handleUnauthorizated } from "lib/error";
import { RootState } from "store";

import useBackUp from "./useBackUp";

const DEBOUNCE_DELAY = 200;

export default function useUserInfo() {
  const token = useSelector((state: RootState) => state.auth.token);

  const [email, setEmail] = useState("");
  const [isRecommendActive, setisRecommendActive] = useState(true);
  const [isOauthUser, setIsOauthUser] = useState(false);
  const [isLoading, setIsLoading] = useState({ info: false, backUp: false });

  const { backUp } = useBackUp();

  const getUserInfo = useCallback(async () => {
    setIsLoading((prev) => ({ ...prev, info: true }));
    try {
      const res = await getUser();
      setEmail(res.email);
      setisRecommendActive(res.recommend);
      setIsOauthUser(res.oauth);
    } catch (error) {
      console.log(error);
      handleUnauthorizated(error);
    }
    setIsLoading((prev) => ({ ...prev, info: false }));
  }, []);

  const onRecommendClick = debounce(async () => {
    try {
      await toggleRecommend();
      setisRecommendActive((prev) => !prev);
    } catch (error) {
      console.log(error);
      handleUnauthorizated(error, "alert");
    }
  }, DEBOUNCE_DELAY);

  const onRequestDataClick = debounce(async () => {
    const ok = window.confirm("후기 데이터를 요청하시겠습니까?");
    if (ok) {
      setIsLoading((prev) => ({ ...prev, backUp: true }));
      await backUp();
      setIsLoading((prev) => ({ ...prev, backUp: false }));
    }
  }, DEBOUNCE_DELAY);

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token, getUserInfo]);

  return {
    isLoading,
    email,
    isOauthUser,
    isRecommendActive,
    onRecommendClick,
    onRequestDataClick,
  };
}
