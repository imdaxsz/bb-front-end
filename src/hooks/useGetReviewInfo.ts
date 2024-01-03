import { useCallback, useState } from "react";

import api from "api";
import { Review } from "types";
import { getDate } from "utils/getDate";

import useSignOut from "./useSignout";

export default function useGetReviewInfo() {
  const [review, setReview] = useState<Review | null>(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const { signOut } = useSignOut();

  // 후기 상세 조회
  const getReviewDetailInfo = useCallback(
    async (id: string, token: string | null) => {
      setLoading(true);
      const res = await api.get(`/api/review/detail/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setReview(res.data);
        setDate(getDate(new Date(res.data.date)));
      }
      if (res.status === 403) signOut();
      setLoading(false);
    },
    [signOut],
  );

  return { loading, review, date, getReviewDetailInfo };
}
