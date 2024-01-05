import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useSearchParams } from "react-router-dom";

import BookItem from "components/BookItem";
import Loading from "components/Loading";
import Pagination from "components/Pagination";
import ReviewItem from "components/ReviewItem";
import useSearch from "hooks/useSearch";

export default function SearchResult() {
  const searchType = useLocation().pathname.split("/")[2];
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("query");
  const page = searchParams.get("page") ? searchParams.get("page") : "1";

  const { books, reviews, totalItems, loading, getSearchResult } = useSearch();

  useEffect(() => {
    getSearchResult(page, keyword, searchType);
  }, [searchType, page, keyword, getSearchResult]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>북북 - 검색 결과</title>
      </Helmet>
      {loading && <Loading />}
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
