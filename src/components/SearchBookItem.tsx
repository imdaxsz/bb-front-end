import { setSelected } from "../store/searchResultSlice";
import { RootState } from "../store/store";
import styles from "../styles/scss/book.module.scss";
import { Book } from "../types/types";
import { useSelector, useDispatch } from "react-redux";

export default function SearchBookItem({ book }: { book: Book }) {
  const selected = useSelector((state: RootState) => state.searchResult.selected);
  const isSelected = selected && selected.isbn === book.isbn;
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setSelected(book));
  };

  return (
    <div className={`${styles.wrapper} ${styles.hover} ${isSelected ? styles.focus : ""}`} onClick={onClick}>
      <div className={styles["img-sm"]}>
        <img src={book.image} alt="thumnail"></img>
      </div>
      <div className={styles.info}>
        <div className={`${styles.title} ellipsis`}>{book.title}</div>
        <p>저자&nbsp; {book.author}</p>
        <p>출판&nbsp; {book.publisher}</p>
      </div>
    </div>
  );
}
