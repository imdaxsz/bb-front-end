import { useState, useEffect } from "react";
import { PiHeartFill, PiHeartLight } from "react-icons/pi";
import { useMediaQuery } from "react-responsive";
import { BeatLoader } from "react-spinners";

import api from "api";
import useSignOut from "hooks/useSignout";
import styles from "styles/detail.module.scss";

interface LikeProps {
  token: string | null;
  isbn: string;
}

export default function Like({ token, isbn }: LikeProps) {
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 450 });
  const { signOut } = useSignOut();

  // 서버에서 좋아요 여부 확인
  useEffect(() => {
    if (token) {
      setLoading(true);
      api
        .get(`/api/like/book/${isbn}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          if (res.status === 200) setLike(res.data);
        });
    }
  }, [token, isbn]);

  const onClick = () => {
    if (!token) window.alert("관심 도서 추가는 로그인 후 가능합니다!");
    else {
      // 추가 또는 삭제
      api
        .post(
          `/api/like`,
          { isbn },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) setLike((prev) => !prev);
          else if (res.status === 403) {
            window.alert("관심 도서 추가는 로그인 후 가능합니다!");
            signOut();
          }
        });
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
