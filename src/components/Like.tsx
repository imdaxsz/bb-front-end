import { PiHeartFill, PiHeartLight } from "react-icons/pi";
import { useMediaQuery } from "react-responsive";
import { BeatLoader } from "react-spinners";

import useLike from "hooks/useLike";
import styles from "styles/detail.module.scss";

interface LikeProps {
  isbn: string;
}

export default function Like({ isbn }: LikeProps) {
  const isMobile = useMediaQuery({ maxWidth: 450 });
  const { isLoading, like, onClick } = useLike({ isbn });

  return (
    <>
      {isMobile ? (
        <div onClick={onClick} className={styles.like}>
          <span>관심도서</span>
          <Icon loading={isLoading} like={like} />
        </div>
      ) : (
        <div onClick={onClick} className={styles.like} title="관심 도서">
          <Icon loading={isLoading} like={like} />
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
