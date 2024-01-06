import { useState, useCallback } from "react";

import { getReviews } from "api/ReviewApi";
import { handleUnauthorizated } from "lib/error";
import { Review } from "types";

export default function useGetReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const getUserReviews = useCallback(async (sort: string | null) => {
    try {
      const res = await getReviews(sort);
      setReviews(res);
    } catch (error) {
      console.log(error);
      handleUnauthorizated(error);
    }
    setLoading(false);
  }, []);

  return { loading, setLoading, reviews, getUserReviews };
}
