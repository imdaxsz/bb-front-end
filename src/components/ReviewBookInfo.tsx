import { Book } from "../types/types";
import styles from "../styles/scss/book.module.scss";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import { RiCloseCircleFill } from "react-icons/ri";

interface ReviewBookInfoType {
  book: Book;
  setBook: React.Dispatch<React.SetStateAction<Book | null>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function ReviewBookInfo({ book, setBook, score, setScore }: ReviewBookInfoType) {

  const onClickStar = (i: number) => {
    setScore(i + 1);
  };

  const onClickDelete = () => {
    setBook(null);
    setScore(3)
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.delete} onClick={onClickDelete}>
        <RiCloseCircleFill size={27} />
      </span>
      <div className={styles.img}>
        <img src={book.image} alt={book.title} />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{book.title}</div>
        <p>저자&nbsp; {book.author}</p>
        <p>출판&nbsp; {book.publisher}</p>
        <div className={styles.score}>
          {[...Array(score)].map((a, i) => (
            <PiStarFill className="star-lg" key={i} onClick={() => onClickStar(i)} />
          ))}
          {[...Array(5 - score)].map((a, i) => (
            <PiStarLight className="star-lg" key={i} onClick={() => onClickStar(score + i)} />
          ))}
        </div>
      </div>
    </div>
  );
}
