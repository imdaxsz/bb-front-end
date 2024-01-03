import { useState, useCallback } from "react";

import api, { isAxiosError, AxiosError } from "@/api";
import { Review } from "@/types";

import useSignOut from "./useSignout";

export default function useGetReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const { signOut } = useSignOut();

  const getUserReviews = useCallback(
    async (sort: string | null, token: string | null) => {
      let url = `/api/review/list`;
      if (sort === "date_asc") url = `/api/review/list?sort=date_asc`;
      else if (sort === "title") url = `/api/review/list?sort=title`;
      try {
        const res = await api.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false);
        if (res.status === 200) setReviews(res.data);
      } catch (error) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response.status === 403)
            signOut();
        }
        setLoading(false);
      }
    },
    [signOut],
  );

  return { loading, setLoading, reviews, getUserReviews };
}
