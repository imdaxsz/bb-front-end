import { post } from "lib/api";

/**
 * @description 도서 추천 요청
 * @param {string} categoryId
 * @returns 추천 도서 정보
 */
export const recommend = (categoryId: string) => {
  return post(`/api/recommend/foryou`, { categoryId });
};

/**
 * @description 후기 작성 후 도서 추천 수신 ON/OFF
 */
export const toggleRecommend = () => {
  return post<void>(`/api/recommend`, {});
};
