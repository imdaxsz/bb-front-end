import api from "../api/api";
import { Book, Review } from "../types/types";

type saveParams = (book: Book | null, rating: number, date: Date, text: string, opt: "save" | "upload", token: string | null) => Promise<any>;

export const saveReview: saveParams = async (book, rating, date, text, opt, token) => {
  let reviewId = "";
  await api
    .post(
      `/api/review/new`,
      { book, rating, date, text, status: opt },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        if (opt === "save") window.alert("저장 완료"); // 임시 저장
        else reviewId = res.data;
      } else {
        throw new Error("Failed to save review");
      }
    });
  return reviewId;
};

type loadParams = (
  token: string | null,
  setReviews?: React.Dispatch<React.SetStateAction<Review[]>>,
  setCount?: React.Dispatch<React.SetStateAction<number>>
) => void;

export const loadReviews: loadParams = (token, setReviews, setCount) => {
  try {
    api
      .get(`/api/review/saved`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          if (setReviews) setReviews(res.data);
          if (setCount) setCount(res.data.length);
        }
      });
  } catch (error) {
    console.log(error);
  }
};
