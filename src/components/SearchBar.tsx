import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { searchBook } from "api/BookApi";
import { RootState } from "store";
import { setKeyword, setResult } from "store/searchResultSlice";
import styles from "styles/searchbar.module.scss";

interface Props {
  placeholder: string;
  keyword?: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchBar({ placeholder, keyword, setLoading }: Props) {
  const [word, setWord] = useState(keyword || "");
  const writeKeyword = useSelector(
    (state: RootState) => state.searchResult.keyword,
  );
  const focusRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value.length > 15) return;
    setWord(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      } catch (error) {
        console.log(error);
      }
    } else if (["/", "/search/review"].includes(pathname))
      navigate(`/search/review?query=${word}`);
    else if (["/recommend", "/search/book"].includes(pathname))
      navigate(`/search/book?query=${word}`);
    else if (["/my_list", "/search/my_list"].includes(pathname))
      navigate(`/search/my_list?query=${word}`);
    if (focusRef.current instanceof HTMLInputElement) focusRef.current.blur();
  };

  const focusSearchBar = () => {
    if (focusRef.current instanceof HTMLInputElement) focusRef.current.focus();
  };

  useEffect(() => {
    if (pathname !== "/write") setWord(keyword || "");
    if (writeKeyword !== "") setWord(writeKeyword);
  }, [keyword, pathname, writeKeyword]);

  return (
    <form
      onSubmit={onSubmit}
      aria-label="검색"
      role="search"
      className={`${pathname === "/write" && styles.med}`}
    >
      <div className={styles.container} onClick={focusSearchBar}>
        <div className={styles.icon}>
          <FiSearch size={`${pathname === "/write" ? 23 : ""}`} />
        </div>
        <input
          onChange={onChange}
          type="text"
          value={word}
          placeholder={placeholder}
          className={styles.input}
          ref={focusRef}
        ></input>
      </div>
    </form>
  );
}
