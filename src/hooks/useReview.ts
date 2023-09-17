import { useCallback, useState } from "react";
import { Book, Review } from "../types/types";
import { getDate } from "../utils/getDate";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setCount } from "../store/savedReviewSlice";
import useSignOut from "./useSignout";

type addReviewFunType = (
  book: Book | null,
  rating: number,
  date: Date,
  text: string,
  opt: "save" | "upload",
  token: string | null,
  savedReviews?: Review[]
) => Promise<any>;

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

  const { signOut } = useSignOut();

  // 후기 수정 시 후기 불러오기
  const loadReview = useCallback(
    async (id: string | null, token: string | null) => {
      setLoading(true);
      const res = await api.get(`/api/review/detail/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      if (res.status === 200) {
        setBook(res.data.book);
        setRating(res.data.rating);
        setText(res.data.text);
        setDate(getDate(new Date(res.data.date)));
      } else if (res.status === 403) signOut();
    },
    [signOut]
  );

  const updateReview = async (id: string | null, token: string | null) => {
    const res = await api.put(
      `/api/review/${id}`,
      { rating, text },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) navigate(`/review/detail/${id}`);
    else if (res.status === 403) signOut();
  };

  const addReview: addReviewFunType = async (book, rating, date, text, opt, token, savedReviews) => {
    setLoading(true);
    let reviewId = "";
    let isSavedReview = false; // 이미 임시저장되어 있는 리뷰인가

    if (savedReviews && savedReviews.length > 0) {
      const savedIsbns = savedReviews.map((r) => r.book.isbn);
      if (book && savedIsbns.includes(book.isbn)) isSavedReview = true;
    }

    const res = await api.post(
      `/api/review/new`,
      { book, rating, date, text, status: opt },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLoading(false);
    if (res.status === 200) {
      if (opt === "save") {
        // 임시 저장
        window.alert("저장 완료");
        if (!isSavedReview) dispatch(setCount(savedCount + 1)); // 임시 저장에 없는 후기일 경우에만 개수 증가
      } else reviewId = res.data;
    } else if (res.status === 403) signOut();
    else {
      throw new Error("Failed to save review");
    }
    return reviewId;
  };

  return { text, setText, book, setBook, rating, setRating, date, loading, setLoading, loadReview, addReview, updateReview };
}
