import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import BookItem from "components/BookItem";
import Head from "components/Head";
import Loader from "components/Loader";
import Pagination from "components/Pagination";
import ReviewItem from "components/ReviewItem";
import useSearch from "hooks/useSearch";
import { RootState } from "store";
import { SearchType } from "types";

export default function SearchResult() {
  const searchType = useLocation().pathname.split("/")[2];
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("query");
  const page = searchParams.get("page") ? searchParams.get("page") : "1";
  const token = useSelector((state: RootState) => state.auth.token);

  const { books, reviews, totalItems, loading, getSearchResult } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!["book", "review", "my_list"].includes(searchType)) return;
    if (searchType !== "book" && !token) navigate("/signin", { replace: true });
    getSearchResult(page, keyword, searchType as SearchType);
  }, [searchType, page, keyword, getSearchResult, token, navigate]);

  return (
    <div className="wrapper">
      <Head title={`'${keyword}' 검색 결과 - 북북`} />
      {loading && <Loader />}
      <div className="list-wrapper">
        <div className="list">
          {reviews.length === 0 &&
            searchType === "review" &&
            !loading &&
            "검색 결과가 없어요."}
          {!loading &&
            reviews.map((review, i) => <ReviewItem review={review} key={i} />)}
        </div>
        <div className="list" style={{ marginBottom: "70px" }}>
          {books.length === 0 &&
            searchType !== "review" &&
            !loading &&
            "검색 결과가 없어요."}
          {!loading && books.map((book, i) => <BookItem book={book} key={i} />)}
        </div>
        {!loading && (
          <Pagination
            totalItems={totalItems}
            currentPage={page ? parseInt(page) : 1}
            pageCount={5}
            itemCountPerPage={50}
          />
        )}
      </div>
    </div>
  );
}
