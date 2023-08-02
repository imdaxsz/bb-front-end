import ReviewItem from "./ReviewItem";
import { useEffect, useState } from "react";
import { Review } from "../types/types";
import api from "../api/api";


export default function Home() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    api.get(`/api/reviews`).then((res) => {
      if (res.status === 200) {
        setReviews(res.data);
      }
    });
  }, []);

  return (
    <div className="wrapper">
      {/* <div className="guide">
        <span>로그인 후, 나만의 책 후기를 남겨보세요!</span>
      </div> */}
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
