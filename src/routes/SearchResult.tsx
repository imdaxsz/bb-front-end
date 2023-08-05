import ReviewItem from "../components/ReviewItem";
import { useEffect, useState } from "react";
import { Review } from "../types/types";
import api from "../api/api";
import { useLocation, useSearchParams } from "react-router-dom";

export default function SearchResult() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const searchType = useLocation().pathname.split("/")[2];
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("query");

  // localhost:3000/search/review?query=
  // localhost:3000/search/book?query=

  useEffect(() => {
    if (searchType === "review") {
      // 후기 검색
      api.get(`/api/search/review?query=${keyword}`).then((res) => {
        if (res.status === 200) {
          console.log(res);
          setReviews(res.data);
        }
      });
    } else {
      // 도서 검색
      api.get(`/api/search/book?query=word`).then((res) => {
        if (res.status === 200) {
          setReviews(res.data);
        }
      });
    }
  }, [searchType]);

  return (
    <div className="wrapper">
      <div className="list-wrapper">
        <div className="list">
          {reviews.map((review, i) => (
            <ReviewItem review={review} key={i} />
          ))}
        </div>
        {/* <div className="list">
          {result.map((book, i) => (
            <BookItem book={book} key={i} />
          ))}
        </div> */}
      </div>
    </div>
  );
}
