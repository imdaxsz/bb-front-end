import { useCallback, useState } from "react";
import { Book } from "../types/types";
import { getDate } from "../utils/getDate";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setCount } from "../store/savedReviewSlice";

type addReviewFunType = (book: Book | null, rating: number, date: Date, text: string, opt: "save" | "upload", token: string | null) => Promise<any>;

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

  const loadReview = useCallback(async (id: string | null, token: string | null) => {
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
    }
  }, []);

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
  };

  const addReview: addReviewFunType = async (book, rating, date, text, opt, token) => {
    let reviewId = "";
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
    if (res.status === 200) {
      if (opt === "save") {
        // 임시 저장
        window.alert("저장 완료");
        dispatch(setCount(savedCount + 1));
      } else reviewId = res.data;
    } else {
      throw new Error("Failed to save review");
    }
    return reviewId;
  };

  return { text, setText, book, setBook, rating, setRating, date, loading, setLoading, loadReview, addReview, updateReview };
}
