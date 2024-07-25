import { Book, BookInfoResponse } from '@/types'

const fetchAuthor = (author: string) => {
  return author.replace(
    /\s?\(지은이\)|\s?\(옮긴이\)|\s?\(글\)|\s?\(그림\)/g,
    '',
  )
}

export const formatBooksInfo = (data: BookInfoResponse[]) => {
  const results: Book[] = []
  data.forEach((b) => {
    const book: Book = {
      isbn: b.isbn13 !== '' ? b.isbn13 : b.isbn,
      title: b.title,
      author: fetchAuthor(b.author),
      publisher: b.publisher,
      cover: b.cover,
    }
    results.push(book)
  })
  return results
}
