import { useCallback, useState } from "react";
import { Search, getSearchResultType } from "../utils/search";
import { Book, Review } from "../types/types";
import { setBookInfo } from "../utils/setBookInfo";

export default function useSearch() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const getSearchResult: getSearchResultType = useCallback(
    async (page, keyword, searchType, token) => {
      setLoading(true);
      const res = await Search(page, keyword, searchType, token);
      if (res.status === 200) {
        if (searchType === "review") setReviews(res.data);
        else if (searchType === "my_list") setBooks(setBookInfo(res.data));
        else {
          setBooks(setBookInfo(res.data.item));
          setTotalItems(res.data.totalResults <= 200 ? res.data.totalResults : 200);
        }
      }
      setLoading(false);
    },
    []
  );

  return { books, reviews, totalItems, loading, setLoading, getSearchResult };
}