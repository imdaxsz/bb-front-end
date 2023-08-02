import { Book } from "../types/types";

export const setBookInfo = (data: any[]) => {
  let results: Book[] = [];
  data.forEach((b, i) => {
    const book: Book = {
      isbn: b.isbn13,
      title: b.title,
      author: b.author,
      publisher: b.publisher,
      image: b.cover,
    };
    results.push(book);
  });
  return results;
};
