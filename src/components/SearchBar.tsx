import { useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { useLocation } from "react-router-dom";

import useSearch from "hooks/useSearch";
import styles from "styles/searchbar.module.scss";

import Loader from "./Loader";

interface Props {
  placeholder: string;
  keyword?: string;
}

export default function SearchBar({ placeholder, keyword }: Props) {
  const focusRef = useRef<HTMLInputElement>(null);
  const { pathname } = useLocation();
  const { loading, onChange, search, word } = useSearch(keyword);

  const focusSearchBar = () => {
    if (focusRef.current instanceof HTMLInputElement) focusRef.current.focus();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (focusRef.current instanceof HTMLInputElement) focusRef.current.blur();
    search();
  };

  return (
    <form
      onSubmit={onSubmit}
      aria-label="검색"
      role="search"
      className={`${pathname === "/write" && styles.med}`}
    >
      {loading && <Loader />}
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
        />
      </div>
    </form>
  );
}
