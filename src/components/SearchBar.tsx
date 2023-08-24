import { useEffect, useRef, useState } from "react";
import styles from "../styles/scss/searchbar.module.scss";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setBookInfo } from "../utils/setBookInfo";
import { reset, setResult } from "../store/searchResultSlice";
import api from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchBar({ placeholder, keyword }: { placeholder: string; keyword?: string }) {
  const [word, setWord] = useState("");
  const focusRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(reset);
    e.preventDefault();
    if (pathname === "/write") {
      api.get(`/api/search/book?query=${word}`).then((res) => {
        if (res.status === 200) dispatch(setResult(setBookInfo(res.data.item)));
      });
    } else if (["/", "/search/review"].includes(pathname)) navigate(`/search/review?query=${word}`);
    else if (["/recommend", "/search/book"].includes(pathname)) navigate(`/search/book?query=${word}`);
    else if (["/my_list", "/search/my_list"].includes(pathname)) navigate(`/search/my_list?query=${word}`);
    if (focusRef.current instanceof HTMLInputElement) focusRef.current.blur();
  };

  const focusSearchBar = () => {
    if (focusRef.current instanceof HTMLInputElement) focusRef.current.focus();
  };

  useEffect(() => {
    setWord(keyword || "");
  }, [keyword]);

  return (
    <form onSubmit={onSubmit} aria-label="검색" role="search" className={`${pathname === "/write" && styles.med}`}>
      <div className={styles.container} onClick={focusSearchBar}>
        <div className={styles.icon}>
          <FiSearch size={`${pathname === "write" ? 23 : ""}`} />
        </div>
        <input onChange={onChange} type="text" value={word} placeholder={placeholder} className={styles.input} ref={focusRef}></input>
      </div>
    </form>
  );
}
