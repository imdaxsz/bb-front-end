import { useEffect, useState } from "react";
import { Book } from "../types/types";
import BookItem from "../components/BookItem";
import Pagination from "../components/Pagination";
import api from "../api/api";
import { setBookInfo } from "../utils/setBookInfo";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";

export default function Recommend() {
  const [totalItems, setTotalItems] = useState(0);
  const [books, setBooks] = useState<Book[] | null>(null);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      api.get(`api/book/recommend?page=${page}`).then((res) => {
        if (res.status === 200) {
          setBooks(setBookInfo(res.data.item));
          setTotalItems(res.data.totalResults);
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [page]);

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
        <Pagination totalItems={totalItems} currentPage={page ? parseInt(page) : 1} pageCount={5} itemCountPerPage={50} />
      </div>
    </div>
  );
}
