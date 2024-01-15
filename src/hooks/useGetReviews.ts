import { useState, useCallback, useEffect } from "react";

import { getReviews } from "api/ReviewApi";
import { handleUnauthorizated } from "lib/error";
import { Review } from "types";

interface Props {
  token: string | null;
  sort: string | null;
}

export default function useGetReviews({ token, sort }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getReviews(sort);
      setReviews(res);
    } catch (error) {
      console.log(error);
      handleUnauthorizated(error);
    }
    setIsLoading(false);
  }, [sort]);

  useEffect(() => {
    if (token) getUserReviews();
  }, [getUserReviews, token]);

  return { isLoading, setIsLoading, reviews };
}
