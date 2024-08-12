import { nextFetch } from '@/libs/fetch'
import { BookInfoResponse, BookList, DetailBookResponse } from '@/types'

class BookApi {
  async getBookInfo(id: string) {
    return nextFetch<DetailBookResponse>(`/api/book/detail/${id}`, {
      method: 'GET',
      next: { revalidate: 86400 },
    }).then((res) => res.body)
  }

  async getIsBookLiked(isbn: string) {
    const res = await nextFetch<{ isLiked: boolean }>(
      `/api/like/book/${isbn}`,
    ).then((r) => r.body)
    return res.isLiked
  }

  async toggleLike(isbn: string) {
    const res = nextFetch(`/api/like`, { method: 'POST', body: { isbn } }).then(
      (r) => r.body,
    )
    return res
  }

  // 추천 도서 목록 조회
  async getRecommendBooks(page: string) {
    return nextFetch<BookList>(`/api/book/recommend?page=${page}`, {
      method: 'GET',
      next: { revalidate: 86400 }, // 하루 단위 재검증
    }).then((res) => res.body)
  }

  // 도서 검색
  async searchBooks(keyword: string) {
    return nextFetch<BookList>(`/api/search/book?query=${keyword}`).then(
      (res) => res.body,
    )
  }

  // 도서 추천 받기
  async getRecommendBook(categoryId: string) {
    return nextFetch<BookInfoResponse | string>(`/api/recommend/foryou`, {
      headers: { category: categoryId },
    }).then((res) => res.body)
  }
}

export default new BookApi()
