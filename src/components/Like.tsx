import { useState, useEffect } from "react";
import { PiHeartFill, PiHeartLight } from "react-icons/pi";
import api from "../api/api";
import styles from "../styles/scss/detail.module.scss";

interface LikeProps {
  token: string | null;
  isbn: string;
}

export default function Like({ token, isbn }: LikeProps) {
  const [like, setLike] = useState(false);

  // 서버에서 좋아요 여부 확인
  useEffect(() => {
    if (token) {
      api
        .get(`/api/like/book/${isbn}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
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
          }
        )
        .then((res) => {
          if (res.status === 200) setLike((prev) => !prev);
        });
    }
  };

  return (
    <div onClick={onClick} className={styles.like} title="관심 도서">
      {like ? <PiHeartFill color="#f94a7b" size="24px" /> : <PiHeartLight size="24px" />}
    </div>
  );
}
