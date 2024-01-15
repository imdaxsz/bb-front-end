import { useCallback, useEffect, useState } from "react";

import { getReview } from "api/ReviewApi";
import { handleUnauthorizated } from "lib/error";
import { Review } from "types";
import { getDate } from "utils/getDate";

export default function useGetReviewInfo({ id }: { id: string }) {
  const [review, setReview] = useState<Review | null>(null);
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 후기 상세 조회
  const getReviewDetailInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getReview(id);
      setReview(res);
      setDate(getDate(new Date(res.date)));
    } catch (error) {
      console.log(error);
      handleUnauthorizated(error);
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    getReviewDetailInfo();
  }, [getReviewDetailInfo]);

  return { isLoading, review, date };
}
