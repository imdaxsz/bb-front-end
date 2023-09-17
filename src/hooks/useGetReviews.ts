import api from "../api/api";
import { Review } from "../types/types";
import useSignOut from "./useSignout";
import { useState } from "react";
import { useCallback } from "react";

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
        if (res.status === 403) signOut();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
    [signOut]
  );

  return { loading, setLoading, reviews, getUserReviews };
}
