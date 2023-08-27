import { Book, BookInfo, SearchResultBook } from "../types/types";

export const setBookInfo = (data: any[]) => {
  let results: Book[] = [];
  data.forEach((b) => {
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

export const setSearchBookInfo = (data: any[]) => {
  let results: SearchResultBook[] = [];
  data.forEach((b) => {
    const book: SearchResultBook = {
      isbn: b.isbn13,
      title: b.title,
      author: b.author,
      publisher: b.publisher,
      image: b.cover,
      categoryId: b.categoryId,
    };
    results.push(book);
  });
  return results;
};

export const setBookDetailInfo = (data: any) => {
  let result: BookInfo = {
    isbn: data.isbn13,
    title: data.title,
    author: data.author,
    publisher: data.publisher,
    pubDate: data.pubDate,
    description: data.description,
    image: data.cover,
    category: { id: data.categoryId, name: data.categoryName },
    itemPage: data.subInfo.itemPage,
    link: data.link,
  };
  return result;
};
