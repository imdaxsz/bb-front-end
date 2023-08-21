import ReviewItem from "../components/ReviewItem";
import { useEffect, useState } from "react";
import { Book, Review } from "../types/types";
import api from "../api/api";
import { useLocation, useSearchParams } from "react-router-dom";
import BookItem from "../components/BookItem";
import { setBookInfo } from "../utils/setBookInfo";

export default function SearchResult() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const searchType = useLocation().pathname.split("/")[2];
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("query");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (searchType === "review") {
      // 후기 검색
      api
        .get(`/api/search/review?query=${keyword}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            setReviews(res.data);
          }
        });
    } else {
      // 도서 검색
      api.get(`/api/search/book?query=${keyword}`).then((res) => {
        if (res.status === 200) {
          setBooks(setBookInfo(res.data.item));
        }
      });
    }
  }, [searchType, keyword, token]);

  return (
    <div className="wrapper">
      <div className="list-wrapper">
        <div className="list">
          {reviews.map((review, i) => (
            <ReviewItem review={review} key={i} />
          ))}
        </div>
        <div className="list">
          {books.map((book, i) => (
            <BookItem book={book} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
