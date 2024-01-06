import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import BookItem from "components/BookItem";
import Head from "components/Head";
import Loading from "components/Loading";
import Pagination from "components/Pagination";
import useGetBooks from "hooks/useGetBooks";

export default function Recommend() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const { loading, books, totalBooks, getRecommendBooks } = useGetBooks();

  useEffect(() => {
    getRecommendBooks(page);
  }, [getRecommendBooks, page]);

  return (
    <div className="wrapper">
      <Head title="추천도서 | 북북" />
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
