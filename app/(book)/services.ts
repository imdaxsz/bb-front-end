import { nextFetch } from '@/libs/fetch'
import { BookInfoResponse, DetailBookResponse, List } from '@/types'

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

  async toggleLike(isbn: string, title: string) {
    const res = nextFetch(`/api/like`, {
      method: 'POST',
      body: { isbn, title },
    }).then((r) => r.body)
    return res
  }

  // 추천 도서 목록 조회
  async getRecommendBooks(page: string) {
    return nextFetch<List<DetailBookResponse>>(
      `/api/book/recommend?page=${page}`,
      {
        method: 'GET',
        next: { revalidate: 86400 }, // 하루 단위 재검증
      },
    ).then((res) => res.body)
  }

  // 도서 검색
  async searchBooks(keyword: string, page?: string) {
    return nextFetch<List<DetailBookResponse>>(
      `/api/search/book?query=${keyword}&page=${page}`,
    ).then((res) => res.body)
  }

  // 도서 추천 받기
  async getRecommendBook(categoryId: string) {
    return nextFetch<BookInfoResponse | string>(`/api/recommend/foryou`, {
      headers: { category: categoryId },
    }).then((res) => res.body)
  }
}

export default new BookApi()
