import { get, post } from "lib/api";
import { Book } from "types";

/**
 * @description 관심도서 여부 조회
 * @param {string} isbn
 * @returns 관심도서 여부
 */
export const getLikeState = (isbn: string) => {
  return get<boolean>(`/api/like/book/${isbn}`);
};

/**
 * @description 관심도서 추가/삭제
 * @param {string} isbn
 */
export const toggleLike = (isbn: string) => {
  return post<void>(`/api/like`, { isbn });
};

/**
 * @description 관심도서 목록 조회
 * @returns 관심도서 목록
 */
export const getMyBooks = () => {
  return get<BookInfoResponse[]>(`/api/like/list`);
};

/**
 * @description 관심도서 내 검색
 * @param {string | null} keyword
 * @returns 조건을 만족하는 도서 목록
 */
export const searchMyBook = (keyword: string | null) => {
  return get<BookInfoResponse[]>(`/api/search/my_list?query=${keyword}`);
};

/**
 * @description 도서 상세 조회
 * @param {string} id
 * @returns 도서 정보
 */
export const getBook = (id: string) => {
  return get<DetailBookResponse>(`/api/book/detail/${id}`);
};

/**
 * @description 추천 도서 검색
 * @param {string | null} keyword
 * @param {string | null} page
 * @returns 조건을 만족하는 도서 목록
 */
export const searchBook = (keyword: string | null, page: string | null) => {
  let url = `/api/search/book?query=${keyword}`;
  if (page) url += `&page=${page}`;
  return get<BookList>(url);
};

/**
 * @description 추천 도서 목록 조회
 * @param {string | null} page
 * @returns 추천 도서 목록
 */
export const getRecommendBooks = (page: string | null) => {
  return get<BookList>(`api/book/recommend?page=${page}`);
};

// ------------------------------------------------------------------
// reponse types
export interface BookInfoResponse extends Book {
  isbn13: string;
}

export interface DetailBookResponse extends BookInfoResponse {
  pubDate: string;
  description: string;
  categoryId: string;
  categoryName: string;
  subInfo: {
    itemPage: number;
  };
  link: string;
}

export interface BookList {
  totalResults: number;
  item: DetailBookResponse[];
}
