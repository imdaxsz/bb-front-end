import { useState, useCallback } from "react";

import { Book } from "@/types";
import { setBookInfo } from "@/utils/setBookInfo";

import api, { isAxiosError, AxiosError } from "../api";

import useSignOut from "./useSignout";

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
      } catch (error) {
        setLoading(false);
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response.status === 403)
            signOut();
        }
        console.log(error);
      }
    },
    [signOut],
  );

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
