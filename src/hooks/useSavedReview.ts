import { SetStateAction, useCallback, useState } from "react";
import { Review } from "../types/types";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setCount } from "../store/savedReviewSlice";
import useSignOut from "./useSignout";

export default function useSavedReview() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const count = useSelector((state: RootState) => state.savedReview.count);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { signOut } = useSignOut();

  const loadSavedReviews = useCallback(
    async (token: string | null, setWriteLoading?: React.Dispatch<SetStateAction<boolean>>) => {
      setLoading(true);
      if (setWriteLoading) setWriteLoading(true);
      try {
        const res = await api.get(`/api/review/saved`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false);
        if (setWriteLoading) setWriteLoading(false);
        if (res.status === 200) {
          if (setReviews) setReviews(res.data);
          dispatch(setCount(res.data.length));
        } else if (res.status === 403) signOut();
      } catch (error) {
        setLoading(false);
        if (setWriteLoading) setWriteLoading(false);
        console.log(error);
      }
    },
    [signOut, dispatch]
  );

  const deleteSavedReview = async (i: number, token: string | null) => {
    const res = await api.delete(`/api/review/${reviews[i]._id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      const newReviews = reviews.filter((a) => a._id !== reviews[i]._id);
      setReviews(newReviews);
      dispatch(setCount(count - 1));
    } else if (res.status === 403) signOut();
    else window.alert("삭제 오류입니다");
  };

  return { reviews, setReviews, loadSavedReviews, deleteSavedReview, loading, setLoading };
}
