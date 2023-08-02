import { Book } from "../types/types";
import styles from "../styles/scss/book.module.scss";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import { RiCloseCircleFill } from "react-icons/ri";

interface ReviewBookInfoType {
  book: Book;
  setBook?: React.Dispatch<React.SetStateAction<Book | null>>;
  rating: number;
  setRating?: React.Dispatch<React.SetStateAction<number>>;
}

export default function ReviewBookInfo({ book, setBook, rating, setRating }: ReviewBookInfoType) {
  const onClickStar = (i: number) => {
    if (setRating) setRating(i + 1);
  };

  const onClickDelete = () => {
    if (setRating && setBook) {
      setBook(null);
      setRating(3);
    }
  };

  return (
    <div className={styles.wrapper}>
      {setBook && (
        <span className={styles.delete} onClick={onClickDelete}>
          <RiCloseCircleFill size={27} />
        </span>
      )}
      <div className={`${setBook ? styles["img-sm"] : styles["img-lg"]}`}>
        <img src={book.image} alt={book.title} />
      </div>
      <div className={styles.info}>
        <div className={`${styles.title}`}>{book.title}</div>
        <p>저자&nbsp; {book.author}</p>
        <p>출판&nbsp; {book.publisher}</p>
        <div className={`${styles.rating} ${setBook && "pointer"}`}>
          {[...Array(rating)].map((a, i) => (
            <PiStarFill className="star-lg" key={i} onClick={() => onClickStar(i)} />
          ))}
          {[...Array(5 - rating)].map((a, i) => (
            <PiStarLight className="star-lg" key={i} onClick={() => onClickStar(rating + i)} />
          ))}
        </div>
      </div>
    </div>
  );
}
