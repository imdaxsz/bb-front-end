import api from "../api/api";
import { Book } from "../types/types";
import { setBookInfo } from "../utils/setBookInfo";
import useSignOut from "./useSignout";
import { useState } from "react";
import { useCallback } from "react";

export default function useMyBookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const { signOut } = useSignOut();

  const getUserMyBookList = useCallback(
    async (token: string) => {
      try {
        const res = await api.get(`/api/like/list`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false);
        if (res.status === 200) {
          setBooks(setBookInfo(res.data));
          setFilteredBooks(setBookInfo(res.data));
        }
        if (res.status === 403) signOut();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
    [signOut]
  );

  const getSortedUserMyList = useCallback(
    (sort: string | null) => {
      if (books.length > 0) {
        if (sort === "date_asc") {
          setFilteredBooks([...books].reverse());
        } else if (sort === "title") {
          const result = [...books].sort((a, b) => a.title.localeCompare(b.title));
          setFilteredBooks([...result]);
        } else setFilteredBooks([...books]);
      }
    },
    [books]
  );

  return { loading, setLoading, books, filteredBooks, getUserMyBookList, getSortedUserMyList };
}
