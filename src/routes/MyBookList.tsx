import { useEffect, useState } from "react";
import { Book } from "../types/types";
import api from "../api/api";
import { setBookInfo } from './../utils/setBookInfo';
import BookItem from "../components/BookItem";

export default function MyBookList({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [books, setBooks] = useState<Book[]>([]);
  const token = localStorage.getItem("token");

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
              console.log(res.data);
              let list:any[] = [];
              res.data.forEach((a: any) => {
                list.push(a.item[0]);
              })
              setBooks(setBookInfo(list));
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [isAuthenticated, token]);

  return (
    <div className="wrapper">
      {isAuthenticated ? (
        <>
          {books.length === 0 ? (
            <div className="guide">
              <span>관심 도서가 없어요.</span>
            </div>
          ) : (
            <div className="list-wrapper">
              <div className="list">
                {books.map((book, i) => (
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
