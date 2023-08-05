import ReviewItem from "./ReviewItem";
import { useEffect, useState } from "react";
import { Review } from "../types/types";
import api from "../api/api";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");

  useEffect(() => {
    console.log(sort)
    if (sort === "date_asc") {
      api.get(`/api/review/list?sort=date_asc`).then((res) => {
        if (res.status === 200) {
          setReviews(res.data);
        }
      });
    } else if (sort === "title") {
      api.get(`/api/review/list?sort=title`).then((res) => {
        if (res.status === 200) {
          setReviews(res.data);
        }
      });
    } else {
      api.get(`/api/review/list`).then((res) => {
        if (res.status === 200) {
          setReviews(res.data);
        }
      });
    }
  }, [sort]);

  return (
    <div className="wrapper">
      {/* <div className="guide">
        <span>로그인 후, 나만의 책 후기를 남겨보세요!</span>
      </div> */}
      {reviews.length === 0 && (
        <div className="guide">
          <span>아직 작성한 후기가 없어요.</span>
        </div>
      )}
      <div className="list-wrapper">
        <div className="list">
          {reviews.map((review, i) => (
            <ReviewItem review={review} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
