import { useEffect, useRef, useState } from "react";
import styles from "../styles/scss/searchbar.module.scss"
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ placeholder, keyword }: { placeholder:string, keyword?: string }) {
  const [word, setWord] = useState("");
  const focusRef = useRef<HTMLInputElement>(null);
  // const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // router.push(`/search?query=${word}`);
    if (focusRef.current instanceof HTMLInputElement) focusRef.current.blur();
  };

  const focusSearchBar = () => {
    if (focusRef.current instanceof HTMLInputElement) focusRef.current.focus();
  };

  useEffect(() => {
    if (keyword) setWord(keyword);
  }, []);

  return (
    <form onSubmit={onSubmit} aria-label="검색" role="search">
      <div className={styles.container} onClick={focusSearchBar}>
        <div className={styles.icon}>
          <FiSearch/>
        </div>
        <input onChange={onChange} type="text" value={word} placeholder={placeholder} className={styles.input} ref={focusRef}></input>
      </div>
    </form>
  );
}
