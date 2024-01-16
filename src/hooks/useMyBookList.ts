import { useState, useCallback, useEffect } from "react";

import { getMyBooks } from "api/BookApi";
import { handleUnauthorizated } from "lib/error";
import { Book } from "types";
import { setBookInfo } from "utils/setBookInfo";

interface Props {
  token: string | null;
  sort: string | null;
}

export default function useMyBookList({ token, sort }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const getUserMyBookList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMyBooks();
      setBooks(setBookInfo(res));
      setFilteredBooks(setBookInfo(res));
    } catch (error) {
      console.log(error);
      handleUnauthorizated(error);
    }
    setLoading(false);
  }, []);

  const getSortedUserMyList = useCallback(() => {
    if (books.length > 0) {
      if (sort === "date_asc") {
        setFilteredBooks([...books].reverse());
        return;
      }
      if (sort === "title") {
        const result = [...books].sort((a, b) =>
          a.title.localeCompare(b.title),
        );
        setFilteredBooks([...result]);
        return;
      }
      setFilteredBooks([...books]);
    }
  }, [books, sort]);

  useEffect(() => {
    if (token) getUserMyBookList();
  }, [getUserMyBookList, token]);

  useEffect(() => {
    if (token) getSortedUserMyList();
  }, [getSortedUserMyList, token]);

  return {
    loading,
    setLoading,
    books,
    filteredBooks,
  };
}
