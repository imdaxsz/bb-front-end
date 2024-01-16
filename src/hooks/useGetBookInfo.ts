import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getBook } from "api/BookApi";
import { BookInfo } from "types";
import { setBookDetailInfo } from "utils/setBookInfo";

export default function useGetBookInfo() {
  const [loading, setLoading] = useState(false);
  const id = useLocation().pathname.split("/")[3];
  const [book, setBook] = useState<BookInfo | null>(null);

  // 도서 상세 조회
  const getBookDetailInfo = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getBook(id);
      setBook(setBookDetailInfo(res));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getBookDetailInfo();
  }, [getBookDetailInfo]);

  return { loading, book };
}
