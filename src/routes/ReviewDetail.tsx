import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import Loading from "components/Loading";
import ReviewBookInfo from "components/ReviewBookInfo";
import useGetReviewInfo from "hooks/useGetReviewInfo";
import useReview from "hooks/useReview";
import { RootState } from "store/store";
import styles from "styles/detail.module.scss";

export default function ReviewDetail() {
  const id = useLocation().pathname.split("/")[3];
  const token = useSelector((state: RootState) => state.auth.token);

  const { loading, review, date, getReviewDetailInfo } = useGetReviewInfo();
  const { deleteReview } = useReview();

  useEffect(() => {
    getReviewDetailInfo(id, token);
  }, [getReviewDetailInfo, id, token]);

  const onClickDelete = () => {
    const ok = window.confirm(
      "삭제된 후기는 복구할 수 없습니다.\n삭제하시겠습니까?",
    );
    if (ok) {
      deleteReview(id, token);
    }
  };

  return (
    <div className="wrapper">
      {loading && <Loading />}
      {!loading && (
        <div className={styles.wrapper}>
          <div className={styles.item}>
            <div className={styles.tool}>
              <div className={styles["tool-item"]}>
                <Link to={`/write?mode=edit&logNo=${id}`}>수정</Link>
              </div>
              <div className={styles["tool-item"]} onClick={onClickDelete}>
                삭제
              </div>
            </div>
            {review && (
              <>
                <div className={styles.book}>
                  <ReviewBookInfo book={review.book} rating={review.rating} />
                </div>
                <div className={styles.content}>
                  <div>{date}</div>
                  <div>{review.text}</div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
