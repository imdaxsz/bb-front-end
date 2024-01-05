import { useCallback, useState } from "react";

import { getReview } from "api/ReviewApi";
import { Review } from "types";
import { getDate } from "utils/getDate";

export default function useGetReviewInfo() {
  const [review, setReview] = useState<Review | null>(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  // 후기 상세 조회
  const getReviewDetailInfo = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await getReview(id);
      setReview(res);
      setDate(getDate(new Date(res.date)));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  return { loading, review, date, getReviewDetailInfo };
}
