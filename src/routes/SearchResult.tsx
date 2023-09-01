import ReviewItem from "../components/ReviewItem";
import { useEffect, useState } from "react";
import { Book, Review } from "../types/types";
import api from "../api/api";
import { useLocation, useSearchParams } from "react-router-dom";
import BookItem from "../components/BookItem";
import { setBookInfo } from "../utils/setBookInfo";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Pagination from "../components/Pagination";

export default function SearchResult() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const searchType = useLocation().pathname.split("/")[2];
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("query");
  const token = useSelector((state: RootState) => state.auth.token);

  const page = searchParams.get("page") ? searchParams.get("page") : "1";
  const [totalItems, setTotalItems] = useState(0);

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
    } else if (searchType === "my_list") {
      // 관심 도서 내 검색
      api
        .get(`/api/search/my_list?query=${keyword}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setBooks(setBookInfo(res.data));
          }
        });
    } else {
      // 도서 검색
      api.get(`/api/search/book?&page=${page}&query=${keyword}`).then((res) => {
        if (res.status === 200) {
          setBooks(setBookInfo(res.data.item));
          setTotalItems(res.data.totalResults);
        }
      });
    }
  }, [searchType, page, keyword, token]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>북북 - 검색 결과</title>
      </Helmet>
      <div className="list-wrapper">
        <div className="list">
          {reviews.map((review, i) => (
            <ReviewItem review={review} key={i} />
          ))}
        </div>
        <div className="list" style={{ marginBottom: "70px" }}>
          {books.map((book, i) => (
            <BookItem book={book} key={i} />
          ))}
        </div>
        <Pagination totalItems={totalItems} currentPage={page ? parseInt(page) : 1} pageCount={5} itemCountPerPage={50} />
      </div>
    </div>
  );
}
