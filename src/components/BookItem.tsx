import { Book } from "../types/types";
import Item from "./Item";
import styles from "../styles/item.module.scss";

export default function BookItem({ book, rec }: { book: Book; rec?: boolean }) {
  return (
    <Item type="book" id={book.isbn} title={book.title} image={book.image} rec={rec}>
      <p className={`${styles.author} ellipsis`}>{book.author}</p>
    </Item>
  );
}
