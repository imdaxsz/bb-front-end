import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { searchBook, searchMyBook } from "api/BookApi";
import { searchReview } from "api/ReviewApi";
import { handleUnauthorizated } from "lib/error";
import { RootState } from "store";
import { setKeyword, setResult } from "store/searchResultSlice";
import { Book, Review, SearchType } from "types";
import { setBookInfo } from "utils/setBookInfo";

export type getSearchResultType = (
  page: string | null,
  keyword: string | null,
  searchType: SearchType,
) => void;

export default function useSearch(keyword?: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const [word, setWord] = useState(keyword || ""); // input value
  const writeKeyword = useSelector(
    (state: RootState) => state.searchResult.keyword,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const getSearchResult: getSearchResultType = useCallback(
    async (page, keyword, searchType) => {
      setLoading(true);
      try {
        if (searchType === "review") {
          const res = await searchReview(keyword);
          setReviews(res);
        } else if (searchType === "my_list") {
          const res = await searchMyBook(keyword);
          setBooks(setBookInfo(res));
        } else {
          const res = await searchBook(keyword, page);
          setBooks(setBookInfo(res.item));
          setTotalItems(res.totalResults <= 200 ? res.totalResults : 200);
        }
      } catch (error) {
        console.log(error);
        handleUnauthorizated(error);
      }
      setLoading(false);
    },
    [],
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value.length > 15) return;
    setWord(value);
  };

  const search = async () => {
    if (word.trim().length === 0) {
      alert("검색어를 입력하세요!");
      return;
    }
    if (pathname === "/write") {
      dispatch(setKeyword(word));
      if (setLoading) setLoading(true);
      try {
        const res = await searchBook(word, null);
        dispatch(setResult(res.item));
        if (setLoading) setLoading(false);
        return;
      } catch (error) {
        console.log(error);
      }
    }
    if (["/", "/search/review"].includes(pathname))
      navigate(`/search/review?query=${word}`);
    if (["/recommend", "/search/book"].includes(pathname))
      navigate(`/search/book?query=${word}`);
    if (["/my_list", "/search/my_list"].includes(pathname))
      navigate(`/search/my_list?query=${word}`);
  };

  useEffect(() => {
    if (pathname !== "/write") setWord(keyword || "");
    if (writeKeyword !== "") setWord(writeKeyword);
  }, [keyword, pathname, writeKeyword]);

  return {
    books,
    reviews,
    totalItems,
    loading,
    setLoading,
    getSearchResult,
    onChange,
    search,
    word,
  };
}
