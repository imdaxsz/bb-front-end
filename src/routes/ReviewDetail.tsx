import { debounce } from "lodash";
import { Link, useLocation } from "react-router-dom";

import Head from "components/Head";
import Loader from "components/Loader";
import ReviewBookInfo from "components/ReviewBookInfo";
import useGetReviewInfo from "hooks/useGetReviewInfo";
import useReview from "hooks/useReview";
import styles from "styles/detail.module.scss";

export default function ReviewDetail() {
  const id = useLocation().pathname.split("/")[3];

  const { isLoading, review, date } = useGetReviewInfo({ id });
  const { deleteReview } = useReview();

  const onClickDelete = debounce(async () => {
    const ok = window.confirm(
      "삭제된 후기는 복구할 수 없습니다.\n삭제하시겠습니까?",
    );
    if (ok) {
      await deleteReview(id);
    }
  }, 300);

  return (
    <div className="wrapper">
      <Head title="후기 | 북북" />
      {isLoading && <Loader />}
      {!isLoading && (
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
