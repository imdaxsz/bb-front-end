import { useEffect, useRef, useState } from "react";
import styles from "../styles/scss/searchbar.module.scss";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBookInfo } from "../utils/setBookInfo";
import { reset, setResult } from "../store/searchResultSlice";

export default function SearchBar({ placeholder, keyword, role }: { placeholder: string; keyword?: string; role?: string }) {
  const [word, setWord] = useState("");
  const focusRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(reset)
    e.preventDefault();
    if (role === "write") {
      axios.get(`http://localhost:8000/search/book?query=${word}`).then((result) => {
        dispatch(setResult(setBookInfo(result.data.item)));
      });
    }

    if (focusRef.current instanceof HTMLInputElement) focusRef.current.blur();
  };

  const focusSearchBar = () => {
    if (focusRef.current instanceof HTMLInputElement) focusRef.current.focus();
  };

  useEffect(() => {
    if (keyword) setWord(keyword);
  }, [keyword]);

  return (
    <form onSubmit={onSubmit} aria-label="검색" role="search" className={`${role === "write" ? styles.med : ""}`}>
      <div className={styles.container} onClick={focusSearchBar}>
        <div className={styles.icon}>
          <FiSearch size={`${role === "write" ? 23 : ""}`} />
        </div>
        <input onChange={onChange} type="text" value={word} placeholder={placeholder} className={styles.input} ref={focusRef}></input>
      </div>
    </form>
  );
}
