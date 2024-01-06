import { useSelector, useDispatch } from "react-redux";

import { DetailBookResponse } from "api/BookApi";
import { RootState } from "store";
import { setCategoryId, setSelected } from "store/searchResultSlice";
import styles from "styles/book.module.scss";

interface Props {
  book: DetailBookResponse;
  listRef: React.MutableRefObject<HTMLDivElement | null>;
  setScrollY: React.Dispatch<React.SetStateAction<number>>;
}

export default function SearchBookItem({ book, listRef, setScrollY }: Props) {
  const selected = useSelector(
    (state: RootState) => state.searchResult.selected,
  );
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
    <div
      className={`${styles.wrapper} ${styles.hover} ${
        isSelected ? styles.focus : ""
      }`}
      onClick={onClick}
    >
      <div className={styles["img-sm"]}>
        <img src={book.cover} alt="thumnail"></img>
      </div>
      <div className={styles.info}>
        <div className={`${styles.title} ellipsis`}>{book.title}</div>
        <p>저자&nbsp; {book.author}</p>
        <p>출판&nbsp; {book.publisher}</p>
      </div>
    </div>
  );
}
