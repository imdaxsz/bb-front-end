import styles from "../styles/scss/modal.module.scss";
import { Book, Review } from "../types/types";
import { getDate } from "../utils/getDate";
import { loadReviews } from "../utils/review";
import Modal from "./Modal";
import { useState } from "react";
import { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../api/api";

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setBook: React.Dispatch<React.SetStateAction<Book | null>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  token: string | null;
}

export default function SavedList({ setModal, setBook, setText, setRating, setCount, token }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);

  const onClickCancel = () => {
    setModal(false);
  };

  const onClickDelete = (e: React.MouseEvent<SVGElement>, i: number) => {
    e.stopPropagation();
    const ok = window.confirm("선택된 임시저장 글을 삭제하시겠습니까?\n삭제된 글은 복구되지 않습니다.");
    if (ok) {
      api
        .delete(`/api/review/${reviews[i]._id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            const newReviews = reviews.filter((a) => a._id !== reviews[i]._id);
            setReviews(newReviews);
            setCount((prev) => prev - 1);
          }
          else window.alert("삭제 오류입니다");
        });
    }
  };

  const loadReview = (i: number) => {
    // 리뷰 불러오기
    setBook(reviews[i].book);
    setText(reviews[i].text);
    setRating(reviews[i].rating);
    // 모달창 닫기
    setModal(false);
  };

  useEffect(() => {
    loadReviews(token, setReviews);
  }, [token]);

  const Content = () => {
    return (
      <>
        <div className={`${styles.title} ${styles.mb}`}>임시저장</div>
        <hr></hr>
        <div className={`${styles.list} ${styles.g0}`}>
          {reviews.map((review, i) => (
            <div className={styles["list-item"]} key={i} onClick={()=>loadReview(i)}>
              <div className={styles.review}>
                <div className="ellipsis">{review.book.title}</div>
                <div className={styles["text-sm"]}>{getDate(new Date(review.date), "-")}</div>
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

  return <Modal onClickOutside={onClickCancel} content={<Content />} bottom={<Bottom />} />;
}
