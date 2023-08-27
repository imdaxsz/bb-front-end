import { useEffect, useState } from "react";
import { Book } from "../types/types";
import api from "../api/api";
import { setBookInfo } from "./../utils/setBookInfo";
import BookItem from "../components/BookItem";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function MyBookList({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const token = localStorage.getItem("token");
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");

  useEffect(() => {
    if (isAuthenticated) {
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
          });
      } catch (error) {
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
      {isAuthenticated ? (
        <>
          {filteredBooks.length === 0 ? (
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
