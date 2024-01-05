import { useState, useCallback } from "react";

import { getMyBooks } from "api/BookApi";
import { Book } from "types";
import { setBookInfo } from "utils/setBookInfo";

export default function useMyBookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const getUserMyBookList = useCallback(async () => {
    try {
      const res = await getMyBooks();
      setBooks(setBookInfo(res));
      setFilteredBooks(setBookInfo(res));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  const getSortedUserMyList = useCallback(
    (sort: string | null) => {
      if (books.length > 0) {
        if (sort === "date_asc") {
          setFilteredBooks([...books].reverse());
        } else if (sort === "title") {
          const result = [...books].sort((a, b) =>
            a.title.localeCompare(b.title),
          );
          setFilteredBooks([...result]);
        } else setFilteredBooks([...books]);
      }
    },
    [books],
  );

  return {
    loading,
    setLoading,
    books,
    filteredBooks,
    getUserMyBookList,
    getSortedUserMyList,
  };
}
