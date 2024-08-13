export interface PageParams {
  params: { [key: string]: string }
}

export interface PageSearchParams {
  searchParams: { [key: string]: string | string[] | undefined }
}

export type PageURL = PageParams & PageSearchParams

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

// reponse types
export interface BookInfoResponse extends Book {
  isbn13: string
}

export interface DetailBookResponse extends BookInfoResponse {
  pubDate: string
  description: string
  categoryId: string
  categoryName: string
  subInfo: {
    itemPage: number
  }
  link: string
}

export interface List<T> {
  totalResults: number
  item: T[]
}

export interface Review {
  _id: string
  book: Book
  user_id: string // 글쓴이 정보
  rating: number
  text: string
  date: Date
}

export interface ReviewForm {
  book: Book | null
  rating: number
  text: string
}

export type SearchType = 'book' | 'review' | 'likes'

export type WriteMode = 'new' | 'edit'

export interface EditorProps {
  token: string
  mode: WriteMode
  editItem?: Review
}

export interface User {
  email: string
  recommend: boolean
  oauth: boolean
}

export interface CursorPage<T> {
  items: T[]
  cursor: string
  hasNext: boolean
}
