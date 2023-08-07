import { setResult, setSelected } from "../store/searchResultSlice";
import { RootState } from "../store/store";
import styles from "../styles/scss/search.module.scss";
import { Book } from "../types/types";
import SearchBookItem from "./SearchBookItem";
import SearchBar from "./SearchBar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

interface SearchBook {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setBook: React.Dispatch<React.SetStateAction<Book | null>>;
}

export default function SearchModal({ setModal, setBook }: SearchBook) {
  const result = useSelector((state: RootState) => state.searchResult.books);
  const selected = useSelector((state: RootState) => state.searchResult.selected);
  const dispatch = useDispatch();

  const onClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    setModal(false);
    dispatch(setSelected(null));
    dispatch(setResult([]));
  };
  const onClickInside = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onClickOk = () => {
    if (!selected) window.alert("책을 선택해주세요!");
    else {
      setBook(selected);
      setModal(false);
      dispatch(setSelected(null));
      dispatch(setResult([]));
    }
  };

  useEffect(() => {
    // 모달창 외부화면 스크롤 방지
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <div className={styles.wrapper} onClick={onClickOutside}>
      <div className={styles.modal} onClick={onClickInside}>
        <div className={styles.searchbar}>
          <SearchBar placeholder="책 검색" />
        </div>
        <div className={styles.list}>
          {result.map((book, i) => (
            <SearchBookItem book={book} key={i} />
          ))}
        </div>
        <button onClick={onClickOk} className="btn btn-primary">
          선택
        </button>
      </div>
    </div>
  );
}
