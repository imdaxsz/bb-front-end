import { useEffect } from "react";
import { Book } from "../types/types";
import BookItem from "../components/BookItem";

export default function Recommend() {
  // useEffect(() => {
  //   axios.get(`http://localhost:8000/recommend`).then((result) => {
  //     console.log("bestseller");
  //   });
  // }, []);

  const book: Book = {
    isbn: "123456",
    title: "망그러진 만화 스페셜 에디션",
    author: "유랑 (지은이)",
    publisher: "출판",
    image: "https://image.aladin.co.kr/product/32139/2/cover/k872834503_1.jpg",
  };

  return (
    <div className="wrapper">
      <div className="list-wrapper">
        <div className="list">
          {[...Array(50)].map((a, i) => (
            <BookItem book={book} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
