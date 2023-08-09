import styles from "../styles/scss/detail.module.scss";
import bs from "../styles/scss/book.module.scss";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BookInfo } from "./../types/types";
import { setBookDetailInfo } from "../utils/setBookInfo";
import { RiCloseCircleFill } from "react-icons/ri";
import api from "../api/api";

export default function ReviewDetail() {
  const id = useLocation().pathname.split("/")[3];
  const [book, setBook] = useState<BookInfo | null>(null);

  useEffect(() => {
    api.get(`/api/book/detail/${id}`).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setBook(setBookDetailInfo(res.data.item[0]));
      }
    });
  }, []);

  return (
    <div className="wrapper">
      <div className={styles.wrapper}>
        <div className={styles.item}>
          {book && (
            <>
              <div className={styles.book}>
                <span className={bs.delete} title="관심 도서에 추가">
                  <RiCloseCircleFill size={27} />
                </span>
                <div className={bs["img-lg"]}>
                  <img src={book.image} alt={book.title} />
                </div>
                <div className={bs.info}>
                  <div className={`${bs.title}`}>{book.title}</div>
                  <p>저자&nbsp; {book.author}</p>
                  <p>출판&nbsp; {book.publisher}</p>
                  <p>출간&nbsp; {book.pubDate}</p>
                  <p>분야&nbsp; {book.category.name}</p>
                  <p>쪽수&nbsp; {book.itemPage}쪽</p>
                </div>
              </div>
              <div className={styles.content}>
                <div>{book.description}</div>
                <div className={styles.link} onClick={() => window.open(book.link)}>
                  자세히 보기
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
