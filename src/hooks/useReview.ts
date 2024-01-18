import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getReview,
  postReview,
  updateReview as requestUpdate,
  deleteReview as requestDelete,
} from "api/ReviewApi";
import { handleUnauthorizated } from "lib/error";
import { RootState } from "store";
import { setCount } from "store/savedReviewSlice";
import { Book, Review } from "types";
import { getDate } from "utils/getDate";

export interface ReviewForm {
  book: Book | null;
  rating: number;
  text: string;
}

export type AddReviewFunType = (
  reviewForm: ReviewForm,
  date: Date,
  opt: "save" | "upload",
  savedReviews?: Review[],
) => Promise<string>;

export type ReviewHandlerType = ({
  book,
  text,
  rating,
}: {
  book?: Book | null;
  text?: string;
  rating?: number;
}) => void;

export default function useReview() {
  const [review, setReview] = useState<ReviewForm>({
    book: null,
    text: "",
    rating: 3,
  });
  const today = new Date();
  const [date, setDate] = useState(getDate(today));
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedCount = useSelector((state: RootState) => state.savedReview.count);

  const onChangeReview: ReviewHandlerType = ({ book, text, rating }) => {
    if (book !== undefined) setReview((prev) => ({ ...prev, book }));
    if (text !== undefined) setReview((prev) => ({ ...prev, text }));
    if (rating) setReview((prev) => ({ ...prev, rating }));
  };

  // 후기 수정 시 후기 불러오기
  const loadReview = useCallback(async (id: string | null) => {
    if (!id) return;
    setLoading(true);
    try {
      const { book, rating, text, date } = await getReview(id);
      setReview({ book, text, rating });
      setDate(getDate(new Date(date)));
    } catch (error) {
      console.log(error);
      handleUnauthorizated(error);
    }
    setLoading(false);
  }, []);

  // 후기 수정
  const updateReview = async (id: string | null) => {
    if (!id) return;
    try {
      await requestUpdate(id, review.rating, review.text);
      navigate(`/review/detail/${id}`);
    } catch (error) {
      console.log(error);
      handleUnauthorizated(error, "confirm");
    }
  };

  // 후기 저장 또는 발행
  const addReview: AddReviewFunType = async (
    reviewForm,
    date,
    opt,
    savedReviews,
  ) => {
    setLoading(true);
    let reviewId = "";
    let isSavedReview = false; // 이미 임시저장되어 있는 리뷰인가
    const { book, rating, text } = reviewForm;

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
      handleUnauthorizated(error);
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
      handleUnauthorizated(error, "alert");
    }
  };

  return {
    review,
    onChangeReview,
    date,
    loading,
    setLoading,
    loadReview,
    addReview,
    updateReview,
    deleteReview,
  };
}
