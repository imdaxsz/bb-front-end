import { Book } from "../types/types";
import Item from "./Item";
import styles from "../styles/scss/item.module.scss";

export default function BookItem({ book }: { book: Book }) {
  return (
    <Item type="review" id={book.isbn} title={book.title} image={book.image}>
      <p className={`${styles.author} ellipsis`}>{book.author}</p>
    </Item>
  );
}