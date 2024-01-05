import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getReview,
  postReview,
  updateReview as requestUpdate,
  deleteReview as requestDelete,
} from "api/ReviewApi";
import { RootState } from "store";
import { setCount } from "store/savedReviewSlice";
import { Book, Review } from "types";
import { getDate } from "utils/getDate";

type addReviewFunType = (
  book: Book | null,
  rating: number,
  date: Date,
  text: string,
  opt: "save" | "upload",
  token: string | null,
  savedReviews?: Review[],
) => Promise<string>;

export default function useReview() {
  const [text, setText] = useState("");
  const [book, setBook] = useState<Book | null>(null);
  const [rating, setRating] = useState(3);
  const today = new Date();
  const [date, setDate] = useState(getDate(today));
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedCount = useSelector((state: RootState) => state.savedReview.count);

  // 후기 수정 시 후기 불러오기
  const loadReview = useCallback(async (id: string | null) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await getReview(id);
      setBook(res.book);
      setRating(res.rating);
      setText(res.text);
      setDate(getDate(new Date(res.date)));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  // 후기 수정
  const updateReview = async (id: string | null) => {
    if (!id) return;
    try {
      await requestUpdate(id, rating, text);
      navigate(`/review/detail/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // 후기 저장 또는 발행
  const addReview: addReviewFunType = async (
    book,
    rating,
    date,
    text,
    opt,
    token,
    savedReviews,
  ) => {
    setLoading(true);
    let reviewId = "";
    let isSavedReview = false; // 이미 임시저장되어 있는 리뷰인가

    if (savedReviews && savedReviews.length > 0) {
      const savedIsbns = savedReviews.map((r) => r.book.isbn);
      if (book && savedIsbns.includes(book.isbn)) isSavedReview = true;
    }

    try {
      const res = await postReview(book, rating, date, text, opt);
      if (opt === "save") {
        // 임시 저장
        window.alert("저장 완료");
        if (!isSavedReview) dispatch(setCount(savedCount + 1)); // 임시 저장에 없는 후기일 경우에만 개수 증가
      } else reviewId = res;
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    return reviewId;
  };

  const deleteReview = async (id: string) => {
    try {
      await requestDelete(id);
      window.alert("삭제되었습니다.");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    text,
    setText,
    book,
    setBook,
    rating,
    setRating,
    date,
    loading,
    setLoading,
    loadReview,
    addReview,
    updateReview,
    deleteReview,
  };
}
