import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getLikeState, toggleLike } from "api/BookApi";
import { handleUnauthorizated } from "lib/error";
import { RootState } from "store";

export default function useLike({ isbn }: { isbn: string }) {
  const [like, setLike] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);

  const getLike = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getLikeState(isbn);
      setLike(result);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [isbn]);

  const onClick = debounce(async () => {
    if (!token) {
      window.alert("관심 도서 추가는 로그인 후 가능합니다!");
      return;
    }
    // 추가 또는 삭제
    try {
      await toggleLike(isbn);
      setLike((prev) => !prev);
    } catch (error) {
      console.log(error);
      handleUnauthorizated(error, "confirm");
    }
  }, 200);

  // 서버에서 좋아요 여부 확인
  useEffect(() => {
    if (token) {
      getLike();
    }
  }, [token, getLike]);

  return { isLoading, like, onClick };
}
