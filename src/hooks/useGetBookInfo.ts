import { useCallback, useState } from "react";
import { BookInfo } from "../types/types";
import api from "../api/api";
import { setBookDetailInfo } from "../utils/setBookInfo";

export default function useGetBookInfo() {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<BookInfo | null>(null);

  // 도서 상세 조회
  const getBookDetailInfo = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/book/detail/${id}`);
      if (res.status === 200) setBook(setBookDetailInfo(res.data.item[0]));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);

  return { loading, book, getBookDetailInfo };
}
