import { useEffect, useState } from "react";
import { Book } from "../types/types";
import BookItem from "../components/BookItem";
import Pagination from "../components/Pagination";
import api from "../api/api";
import { setBookInfo } from "../utils/setBookInfo";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Recommend() {
  const [totalItems, setTotalItems] = useState(0);
  const [books, setBooks] = useState<Book[] | null>(null);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    api.get(`api/book/recommend?page=${page}`).then((res) => {
      if (res.status === 200) {
        setBooks(setBookInfo(res.data.item));
        setTotalItems(res.data.totalResults);
      }
    });
  }, [page]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>북북 - 추천도서</title>
      </Helmet>
      <div className="list-wrapper">
        <div className="list" style={{ marginBottom: "70px" }}>
          {books && (
            <>
              {books.map((book, i) => (
                <BookItem book={book} key={i} />
              ))}
            </>
          )}
        </div>
        <Pagination totalItems={totalItems} currentPage={page ? parseInt(page) : 1} pageCount={5} itemCountPerPage={50} />
      </div>
    </div>
  );
}
