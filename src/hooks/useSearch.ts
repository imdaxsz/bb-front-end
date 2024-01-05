import { useCallback, useState } from "react";

import { searchBook, searchMyBook } from "api/BookApi";
import { searchReview } from "api/ReviewApi";
import { Book, Review } from "types";
import { setBookInfo } from "utils/setBookInfo";

export type getSearchResultType = (
  page: string | null,
  keyword: string | null,
  searchType: string,
) => void;

export default function useSearch() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const getSearchResult: getSearchResultType = useCallback(
    async (page, keyword, searchType) => {
      setLoading(true);
      try {
        if (searchType === "review") {
          const res = await searchReview(keyword);
          setReviews(res);
        } else if (searchType === "my_list") {
          const res = await searchMyBook(keyword);
          console.log(res);
          setBooks(setBookInfo(res));
        } else {
          const res = await searchBook(keyword, page);
          setBooks(setBookInfo(res.item));
          setTotalItems(res.totalResults <= 200 ? res.totalResults : 200);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    },
    [],
  );

  return { books, reviews, totalItems, loading, setLoading, getSearchResult };
}
