import { SetStateAction, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteReview, getSavedReviews } from "api/ReviewApi";
import { handleUnauthorizated } from "lib/error";
import { RootState } from "store";
import { setCount } from "store/savedReviewSlice";
import { Review } from "types";

export default function useSavedReview() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const count = useSelector((state: RootState) => state.savedReview.count);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const loadSavedReviews = useCallback(
    async (setWriteLoading?: React.Dispatch<SetStateAction<boolean>>) => {
      setLoading(true);
      if (setWriteLoading) setWriteLoading(true);
      try {
        const res = await getSavedReviews();
        if (setReviews) setReviews(res);
        dispatch(setCount(res.length));
      } catch (error) {
        console.log(error);
        handleUnauthorizated(error);
      }
      setLoading(false);
      if (setWriteLoading) setWriteLoading(false);
    },
    [dispatch],
  );

  const deleteSavedReview = async (i: number) => {
    try {
      await deleteReview(reviews[i]._id);
      const newReviews = reviews.filter((a) => a._id !== reviews[i]._id);
      setReviews(newReviews);
      dispatch(setCount(count - 1));
    } catch (error) {
      console.log(error);
      handleUnauthorizated(error, "confirm");
    }
  };

  return {
    savedReviews: reviews,
    setReviews,
    loadSavedReviews,
    deleteSavedReview,
    loading,
    setLoading,
  };
}
