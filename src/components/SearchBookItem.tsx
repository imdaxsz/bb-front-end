import { setCategoryId, setSelected } from "../store/searchResultSlice";
import { RootState } from "../store/store";
import styles from "../styles/scss/book.module.scss";
import { SearchResultBook } from "../types/types";
import { useSelector, useDispatch } from "react-redux";

interface Props {
  book: SearchResultBook;
  listRef: React.MutableRefObject<HTMLDivElement | null>;
  setScrollY: React.Dispatch<React.SetStateAction<number>>;
}

export default function SearchBookItem({ book, listRef, setScrollY }: Props) {
  const selected = useSelector((state: RootState) => state.searchResult.selected);
  const isSelected = selected && selected.isbn === book.isbn;
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setSelected(book));
    dispatch(setCategoryId(book.categoryId));
    if (listRef.current) {
      const scrollY = listRef.current.scrollTop;
      setScrollY(scrollY);
    }
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
