import ReviewItem from "./ReviewItem";
import { useEffect, useState } from "react";
import { Review } from "../types/types";
import api from "../api/api";
import { useSearchParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Home({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (isAuthenticated) {
      let url = `/api/review/list`;
      if (sort === "date_asc") url = `/api/review/list?sort=date_asc`;
      else if (sort === "title") url = `/api/review/list?sort=title`;
      try {
        api
          .get(url, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              setReviews(res.data);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [isAuthenticated, sort, token]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>북북 - 홈</title>
      </Helmet>
      {isAuthenticated ? (
        <>
          {reviews.length === 0 ? (
            <div className="guide">
              <span>아직 작성한 후기가 없어요.</span>
            </div>
          ) : (
            <div className="list-wrapper">
              <div className="list">
                {reviews.map((review, i) => (
                  <ReviewItem review={review} key={i} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="guide">
          <span>로그인 후, 나만의 책 후기를 남겨보세요!</span>
        </div>
      )}
    </div>
  );
}
