import { useCallback, useState } from "react";

import { getBook } from "api/BookApi";
import { BookInfo } from "types";
import { setBookDetailInfo } from "utils/setBookInfo";

export default function useGetBookInfo() {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<BookInfo | null>(null);

  // 도서 상세 조회
  const getBookDetailInfo = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await getBook(id);
      setBook(setBookDetailInfo(res));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);

  return { loading, book, getBookDetailInfo };
}
