import Head from "components/Head";
import Like from "components/Like";
import Loader from "components/Loader";
import useGetBookInfo from "hooks/useGetBookInfo";
import bs from "styles/book.module.scss";
import styles from "styles/detail.module.scss";

export default function BookDetail() {
  const { loading, book } = useGetBookInfo();

  return (
    <div className="wrapper">
      <Head title={`${book ? book.title + " | 북북" : "북북"}`} />
      {loading && <Loader />}
      {!loading && (
        <div className={styles.wrapper}>
          <div className={styles.item}>
            {book && (
              <>
                <div className={styles.book}>
                  <div>
                    <div className={bs["img-lg"]}>
                      <img src={book.cover} alt={book.title} />
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
                <Like isbn={book.isbn} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
