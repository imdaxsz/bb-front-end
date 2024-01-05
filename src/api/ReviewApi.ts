import { del, get, post, put } from "lib/api";
import { Book, Review } from "types";

/**
 * @description 후기 목록 조회
 * @param {string | null} sort
 * @returns 후기 목록
 */
export const getReviews = (sort: string | null) => {
  let url = `/api/review/list`;
  if (sort === "date_asc") url = `/api/review/list?sort=date_asc`;
  else if (sort === "title") url = `/api/review/list?sort=title`;
  return get<Review[]>(url);
};

/**
 * @description 후기 검색
 * @param {string | null} keyword 검색어
 * @returns 조건을 만족하는 후기 목록
 */
export const searchReview = (keyword: string | null) => {
  return get<Review[]>(`/api/search/review?query=${keyword}`);
};

/**
 * @description 후기 상세 조회
 * @param {string} id
 * @returns 후기 정보
 */
export const getReview = (id: string) => {
  return get<Review>(`/api/review/detail/${id}`);
};

/**
 * @description 임시 저장된 후기 목록 조회
 * @returns 후기 목록
 */
export const getSavedReviews = () => {
  return get<Review[]>(`/api/review/saved`);
};

/**
 * @description 새로운 후기 작성 또는 저장
 * @param {Book | null} book 도서 정보
 * @param {number} rating 별점
 * @param {Date} date 후기 작성 시간
 * @param {string} text 후기 내용
 * @param {string} opt 발행 옵션 (업로드 | 임시저장)
 */
export const postReview = (
  book: Book | null,
  rating: number,
  date: Date,
  text: string,
  opt: string,
) => {
  return post<string>(`/api/review/new`, {
    book,
    rating,
    date,
    text,
    status: opt,
  });
};

// TODO: PATCH로 변경
/**
 * @description 후기 목록 조회
 * @param {string} id 후기 아이디
 * @param {number} rating 별점
 * @param {string} text 후기 내용
 */
export const updateReview = (id: string, rating: number, text: string) => {
  return put<Review>(`/api/review/${id}`, { rating, text });
};

/**
 * @description 후기 삭제
 * @param {string} id 후기 아이디
 */
export const deleteReview = (id: string) => {
  return del<void>(`/api/review/${id}`);
};

/**
 * @description 후기 목록 백업
 * @return 후기 목록
 */
export const backUpReviews = () => {
  return get<{ reviews: Review[] }>(`/api/review/backup`);
};
