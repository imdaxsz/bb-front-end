import { Book, BookInfo, SearchResultBook } from "../types/types";

const fetchAuthor = (author: string) => {
  return author.replace(/\s?\(지은이\)|\s?\(옮긴이\)|\s?\(글\)|\s?\(그림\)/g, "");
};

export const setBookInfo = (data: any[]) => {
  let results: Book[] = [];
  data.forEach((b) => {
    const book: Book = {
      isbn: b.isbn13 !== "" ? b.isbn13 : b.isbn,
      title: b.title,
      author: fetchAuthor(b.author),
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
      isbn: b.isbn13 !== "" ? b.isbn13 : b.isbn,
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
    isbn: data.isbn13 !== "" ? data.isbn13 : data.isbn,
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
