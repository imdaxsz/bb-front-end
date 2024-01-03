import { IoMdClose } from "react-icons/io";
import { PiStarFill, PiStarLight } from "react-icons/pi";

import styles from "@/styles/book.module.scss";
import { Book } from "@/types";

interface ReviewBookInfoType {
  book: Book;
  setBook?: React.Dispatch<React.SetStateAction<Book | null>>;
  rating: number;
  setRating?: React.Dispatch<React.SetStateAction<number>>;
  isEdit?: boolean;
}

export default function ReviewBookInfo({
  book,
  setBook,
  rating,
  setRating,
  isEdit,
}: ReviewBookInfoType) {
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
      {setBook && !isEdit && (
        <span className={styles.delete} onClick={onClickDelete}>
          <IoMdClose />
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
            <PiStarFill
              className="star-lg"
              key={i}
              onClick={() => onClickStar(i)}
            />
          ))}
          {[...Array(5 - rating)].map((a, i) => (
            <PiStarLight
              className="star-lg"
              key={i}
              onClick={() => onClickStar(rating + i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
