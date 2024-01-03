export interface Book {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  image: string;
}

export interface SearchResultBook extends Book {
  categoryId: string;
}

export interface BookInfo extends Book {
  pubDate: string;
  description: string;
  category: { id: string; name: string };
  itemPage: number;
  link: string;
}

export interface Review {
  _id: string;
  book: Book;
  user_id: string; // 글쓴이 정보
  rating: number;
  text: string;
  date: Date;
}
