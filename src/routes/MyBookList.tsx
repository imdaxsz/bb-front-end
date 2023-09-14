import { useEffect, useState } from "react";
import { Book } from "../types/types";
import api from "../api/api";
import { setBookInfo } from "./../utils/setBookInfo";
import BookItem from "../components/BookItem";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Loading from "../components/Loading";

export default function MyBookList({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      try {
        api
          .get(`/api/like/list`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              setBooks(setBookInfo(res.data));
              setFilteredBooks(setBookInfo(res.data));
            }
            setLoading(false);
          });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    if (books.length > 0) {
      if (sort === "date_asc") {
        setFilteredBooks([...books].reverse());
      } else if (sort === "title") {
        const result = [...books].sort((a, b) => a.title.localeCompare(b.title));
        setFilteredBooks([...result]);
      } else {
        setFilteredBooks([...books]);
      }
    }
  }, [books, books.length, sort]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>북북 - 관심도서</title>
      </Helmet>
      {loading && <Loading />}
      {isAuthenticated ? (
        <>
          {filteredBooks.length === 0 && !loading ? (
            <div className="guide">
              <span>관심 도서가 없어요.</span>
            </div>
          ) : (
            <div className="list-wrapper">
              <div className="list">
                {filteredBooks.map((book, i) => (
                  <BookItem book={book} key={i} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="guide">
          <span>로그인 후, 관심 도서를 추가해보세요!</span>
        </div>
      )}
    </div>
  );
}
