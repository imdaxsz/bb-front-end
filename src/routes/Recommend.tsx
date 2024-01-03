import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";

import BookItem from "@/components/BookItem";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import useGetBooks from "@/hooks/useGetBooks";

export default function Recommend() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const { loading, books, totalBooks, getRecommendBooks } = useGetBooks();

  useEffect(() => {
    getRecommendBooks(page);
  }, [getRecommendBooks, page]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>북북 - 추천도서</title>
      </Helmet>
      <div className="list-wrapper">
        <div className="list" style={{ marginBottom: "70px" }}>
          {loading && <Loading />}
          {books && books.map((book, i) => <BookItem book={book} key={i} />)}
        </div>
        <Pagination
          totalItems={totalBooks}
          currentPage={page ? parseInt(page) : 1}
          pageCount={5}
          itemCountPerPage={50}
        />
      </div>
    </div>
  );
}
