import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Like from "@/components/Like";
import Loading from "@/components/Loading";
import useGetBookInfo from "@/hooks/useGetBookInfo";
import { RootState } from "@/store/store";
import bs from "@/styles/book.module.scss";
import styles from "@/styles/detail.module.scss";

export default function BookDetail() {
  const id = useLocation().pathname.split("/")[3];
  const token = useSelector((state: RootState) => state.auth.token);
  const { loading, book, getBookDetailInfo } = useGetBookInfo();

  useEffect(() => {
    getBookDetailInfo(id);
  }, [getBookDetailInfo, id]);

  return (
    <div className="wrapper">
      {loading && <Loading />}
      {!loading && (
        <div className={styles.wrapper}>
          <div className={styles.item}>
            {book && (
              <>
                <div className={styles.book}>
                  <div>
                    <div className={bs["img-lg"]}>
                      <img src={book.image} alt={book.title} />
                    </div>
                  </div>
                  <div className={bs["detail-info"]}>
                    <div className={bs["detail-title"]}>{book.title}</div>
                    <p>저자&nbsp; {book.author}</p>
                    <p>출판&nbsp; {book.publisher}</p>
                    <p>출간&nbsp; {book.pubDate}</p>
                    <p>분야&nbsp; {book.category.name}</p>
                    <p>쪽수&nbsp; {book.itemPage}쪽</p>
                  </div>
                </div>
                <div className={styles.content}>
                  <div>{book.description}</div>
                  <div
                    className={styles.link}
                    onClick={() => window.open(book.link)}
                  >
                    자세히 보기
                  </div>
                </div>
                <Like token={token} isbn={book.isbn} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
