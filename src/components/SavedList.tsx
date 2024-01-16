import { debounce } from "lodash";
import { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

import { ReviewHandlerType } from "hooks/useReview";
import useSavedReview from "hooks/useSavedReview";
import styles from "styles/modal.module.scss";
import { getDate } from "utils/getDate";

import Loader from "./Loader";
import Modal from "./Modal";

interface Props {
  onClose: () => void;
  setReview: ReviewHandlerType;
}

export default function SavedList({ onClose, setReview }: Props) {
  const { savedReviews, loadSavedReviews, deleteSavedReview, loading } =
    useSavedReview();

  const onClickDelete = (e: React.MouseEvent<SVGElement>, i: number) => {
    e.stopPropagation();
    const ok = window.confirm(
      "선택된 임시저장 글을 삭제하시겠습니까?\n삭제된 글은 복구되지 않습니다.",
    );
    if (ok) {
      deleteSavedReview(i);
    }
  };

  const loadReview = debounce((i: number) => {
    // 리뷰 불러오기
    const { book, text, rating } = savedReviews[i];
    setReview({ book, text, rating });
    onClose();
  }, 300);

  useEffect(() => {
    loadSavedReviews();
  }, [loadSavedReviews]);

  const Content = () => {
    return (
      <>
        {loading && <Loader />}
        <div className={`${styles.title} ${styles.mb}`}>임시저장</div>
        <hr></hr>
        <div className={`${styles.list} ${styles.g0}`}>
          {savedReviews.map((review, i) => (
            <div
              className={styles["list-item"]}
              key={i}
              onClick={() => loadReview(i)}
            >
              <div className={styles.review}>
                <div className="ellipsis">{review.book.title}</div>
                <div className={styles["text-sm"]}>
                  {getDate(new Date(review.date), "-")}
                </div>
              </div>
              <div className={styles.icon}>
                <FaRegTrashAlt onClick={(e) => onClickDelete(e, i)} />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const Bottom = () => {
    return (
      <button onClick={onClose} className="btn btn-light">
        닫기
      </button>
    );
  };

  return (
    <Modal onClickOutside={onClose} content={<Content />} bottom={<Bottom />} />
  );
}
