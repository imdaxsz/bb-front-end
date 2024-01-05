import { useState, useEffect, useCallback } from "react";
import { PiHeartFill, PiHeartLight } from "react-icons/pi";
import { useMediaQuery } from "react-responsive";
import { BeatLoader } from "react-spinners";

import { getLikeState, toggleLike } from "api/BookApi";
import styles from "styles/detail.module.scss";

interface LikeProps {
  token: string | null;
  isbn: string;
}

export default function Like({ token, isbn }: LikeProps) {
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 450 });

  const getLike = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getLikeState(isbn);
      setLike(result);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [isbn]);

  // 서버에서 좋아요 여부 확인
  useEffect(() => {
    if (token) {
      getLike();
    }
  }, [token, getLike]);

  const onClick = async () => {
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
    }
  };

  return (
    <>
      {isMobile ? (
        <div onClick={onClick} className={styles.like}>
          <span>관심도서</span>
          <Icon loading={loading} like={like} />
        </div>
      ) : (
        <div onClick={onClick} className={styles.like} title="관심 도서">
          <Icon loading={loading} like={like} />
        </div>
      )}
    </>
  );
}

function Icon({ loading, like }: { loading: boolean; like: boolean }) {
  if (loading) return <BeatLoader size={2} color="#777" />;
  return (
    <>
      {like ? (
        <PiHeartFill color="#f94a7b" size="24px" />
      ) : (
        <PiHeartLight size="24px" />
      )}
    </>
  );
}
