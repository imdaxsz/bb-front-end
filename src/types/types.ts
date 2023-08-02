export interface Book {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  image: string;
}

export interface Review {
  _id: string,
  book: Book,
  // user?: any, // 글쓴이 정보
  rating: number,
  text: string,
  date: Date,
}