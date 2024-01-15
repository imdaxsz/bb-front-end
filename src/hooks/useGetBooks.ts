import { useCallback, useEffect, useState } from "react";

import { getRecommendBooks as request } from "api/BookApi";
import { Book } from "types";
import { setBookInfo } from "utils/setBookInfo";

export default function useGetBooks({ page }: { page: string | null }) {
  const [loading, setLoading] = useState(false);
  const [totalBooks, setTotalBooks] = useState(0);
  const [books, setBooks] = useState<Book[] | null>(null);

  // 추천 도서 (베스트셀러) 리스트 조회
  const getRecommendBooks = useCallback(async (page: string | null) => {
    setLoading(true);
    try {
      const res = await request(page);
      setBooks(setBookInfo(res.item));
      setTotalBooks(res.totalResults);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getRecommendBooks(page);
  }, [getRecommendBooks, page]);

  return { loading, books, totalBooks };
}
