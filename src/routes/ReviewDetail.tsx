import styles from "../styles/scss/detail.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReviewBookInfo from "../components/ReviewBookInfo";
import { Review } from "./../types/types";
import { useState } from "react";
import { useEffect } from "react";
import { getDate } from "../utils/getDate";
import api from "../api/api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Loading from "../components/Loading";
import { useSignOut } from "./../hooks/useSignout";

export default function ReviewDetail() {
  const id = useLocation().pathname.split("/")[3];
  const navigate = useNavigate();

  const [review, setReview] = useState<Review | null>(null);
  const [date, setDate] = useState("");

  const token = useSelector((state: RootState) => state.auth.token);
  const { Signout } = useSignOut();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/api/review/detail/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setReview(res.data);
          setDate(getDate(new Date(res.data.date)));
        }
        if (res.status === 403) Signout();
        setLoading(false);
      });
  }, [Signout, id, token]);

  const onClickDelete = () => {
    const ok = window.confirm("삭제된 후기는 복구할 수 없습니다.\n삭제하시겠습니까?");
    if (ok) {
      api
        .delete(`/api/review/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            window.alert("삭제되었습니다.");
            navigate("/");
          }
          if (res.status === 403) Signout();
        });
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
