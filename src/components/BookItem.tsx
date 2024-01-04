import styles from "styles/item.module.scss";
import { Book } from "types";

import Item from "./Item";

export default function BookItem({ book, rec }: { book: Book; rec?: boolean }) {
  return (
    <Item
      type="book"
      id={book.isbn}
      title={book.title}
      image={book.cover}
      rec={rec}
    >
      <p className={`${styles.author} ellipsis`}>{book.author}</p>
    </Item>
  );
}
