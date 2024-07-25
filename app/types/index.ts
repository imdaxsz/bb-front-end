export interface Book {
  isbn: string
  title: string
  author: string
  publisher: string
  cover: string
}

export interface BookInfo extends Book {
  pubDate: string
  description: string
  category: { id: string; name: string }
  itemPage: number
  link: string
}

export interface Review {
  _id: string
  book: Book
  user_id: string // 글쓴이 정보
  rating: number
  text: string
  date: Date
}

export interface User {
  email: string
  recommend: boolean
  oauth: boolean
}

export type SearchType = 'book' | 'review' | 'my_list'
