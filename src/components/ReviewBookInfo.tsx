import { IoMdClose } from "react-icons/io";
import { PiStarFill, PiStarLight } from "react-icons/pi";

import { ReviewHandlerType } from "hooks/useReview";
import styles from "styles/book.module.scss";
import { Book } from "types";

interface ReviewBookInfoType {
  book: Book;
  rating: number;
  setRating?: ReviewHandlerType;
  isEdit?: boolean;
}

export default function ReviewBookInfo({
  book,
  setRating,
  rating,
  isEdit,
}: ReviewBookInfoType) {
  const onClickStar = (i: number) => {
    if (setRating) setRating({ rating: i + 1 });
  };

  const onClickDelete = () => {
    if (setRating) setRating({ book: null, rating: 3 });
  };

  return (
    <div className={styles.wrapper}>
      {setRating && !isEdit && (
        <span className={styles.delete} onClick={onClickDelete}>
          <IoMdClose />
        </span>
      )}
      <div className={`${setRating ? styles["img-sm"] : styles["img-lg"]}`}>
        <img src={book.cover} alt={book.title} />
      </div>
      <div className={styles.info}>
        <div className={`${styles.title}`}>{book.title}</div>
        <p>저자&nbsp; {book.author}</p>
        <p>출판&nbsp; {book.publisher}</p>
        <div className={`${styles.rating} ${setRating && "pointer"}`}>
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
