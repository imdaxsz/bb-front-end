import { useCallback, useState } from "react";

import api from "@/api";
import { Book } from "@/types";
import { setBookInfo } from "@/utils/setBookInfo";

export default function useGetBooks() {
  const [loading, setLoading] = useState(false);
  const [totalBooks, setTotalBooks] = useState(0);
  const [books, setBooks] = useState<Book[] | null>(null);

  // 추천 도서 (베스트셀러) 리스트 조회
  const getRecommendBooks = useCallback(async (page: string | null) => {
    setLoading(true);
    try {
      const res = await api.get(`api/book/recommend?page=${page}`);
      if (res.status === 200) {
        setBooks(setBookInfo(res.data.item));
        setTotalBooks(res.data.totalResults);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);

  return { loading, books, totalBooks, getRecommendBooks };
}
