import { debounce } from "lodash";
import { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

import useSavedReview from "hooks/useSavedReview";
import styles from "styles/modal.module.scss";
import { Book } from "types";
import { getDate } from "utils/getDate";

import Loading from "./Loading";
import Modal from "./Modal";

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setBook: React.Dispatch<React.SetStateAction<Book | null>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

export default function SavedList({
  setModal,
  setBook,
  setText,
  setRating,
}: Props) {
  const { reviews, loadSavedReviews, deleteSavedReview, loading } =
    useSavedReview();

  const onClickCancel = () => {
    setModal(false);
  };

  const onClickDelete = debounce(
    (e: React.MouseEvent<SVGElement>, i: number) => {
      e.stopPropagation();
      const ok = window.confirm(
        "선택된 임시저장 글을 삭제하시겠습니까?\n삭제된 글은 복구되지 않습니다.",
      );
      if (ok) {
        deleteSavedReview(i);
      }
    },
    200,
  );

  const loadReview = debounce((i: number) => {
    // 리뷰 불러오기
    setBook(reviews[i].book);
    setText(reviews[i].text);
    setRating(reviews[i].rating);
    setModal(false);
  }, 200);

  useEffect(() => {
    loadSavedReviews();
  }, [loadSavedReviews]);

  const Content = () => {
    return (
      <>
        {loading && <Loading />}
        <div className={`${styles.title} ${styles.mb}`}>임시저장</div>
        <hr></hr>
        <div className={`${styles.list} ${styles.g0}`}>
          {reviews.map((review, i) => (
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
      <button onClick={onClickCancel} className="btn btn-light">
        닫기
      </button>
    );
  };

  return (
    <Modal
      onClickOutside={onClickCancel}
      content={<Content />}
      bottom={<Bottom />}
    />
  );
}
