import { BookInfoResponse, DetailBookResponse } from "api/BookApi";
import { Book, BookInfo } from "types";

const fetchAuthor = (author: string) => {
  return author.replace(
    /\s?\(지은이\)|\s?\(옮긴이\)|\s?\(글\)|\s?\(그림\)/g,
    "",
  );
};

export const setBookInfo = (data: BookInfoResponse[]) => {
  const results: Book[] = [];
  data.forEach((b) => {
    const book: Book = {
      isbn: b.isbn13 !== "" ? b.isbn13 : b.isbn,
      title: b.title,
      author: fetchAuthor(b.author),
      publisher: b.publisher,
      cover: b.cover,
    };
    results.push(book);
  });
  return results;
};

export const setBookDetailInfo = (data: DetailBookResponse) => {
  const result: BookInfo = {
    isbn: data.isbn13 !== "" ? data.isbn13 : data.isbn,
    title: data.title,
    author: data.author,
    publisher: data.publisher,
    pubDate: data.pubDate,
    description: data.description,
    cover: data.cover,
    category: { id: data.categoryId, name: data.categoryName },
    itemPage: data.subInfo.itemPage,
    link: data.link,
  };
  return result;
};
