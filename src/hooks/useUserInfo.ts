import api from "../api/api";
import { useState } from "react";
import { useCallback } from "react";
import { setRecommend } from "../utils/recommend";
import { backUp } from "../utils/backUp";
import { useSignOut } from "./useSignout";

export default function useUserInfo({token}:{token: string | null}) {
  const [active, setActive] = useState(true);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(Boolean(token));
  const [isOauthUser, setIsOauthUser] = useState(false);
  const { Signout } = useSignOut();

  const getUserInfo = useCallback(() => {
    api
      .get(`/api/user/info`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setEmail(res.data.email);
          setActive(res.data.recommend);
          setIsOauthUser(res.data.oauth);
        }
        if (res.status === 403) Signout();
      });
  }, [Signout, token]);

  const onRecommendClick = async () => {
    const result = await setRecommend(token);
    if (result === 200) setActive((prev) => !prev);
    else if (result === 403) Signout();
  };

  const onRequestDataClick = async () => {
    const ok = window.confirm("후기 데이터를 요청하시겠습니까?");
    if (ok) {
      setLoading(true);
      await backUp(token);
      setLoading(false);
    }
  };

  return { active, setActive, email, setEmail, isOauthUser, loading, getUserInfo, onRecommendClick, onRequestDataClick };
}
