import { reset, setKeyword, setResult, setSelected } from "../store/searchResultSlice";
import { RootState } from "../store/store";
import styles from "../styles/scss/modal.module.scss";
import { Book } from "../types/types";
import SearchBookItem from "./SearchBookItem";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import { useEffect, useRef, useState } from "react";

interface SearchBook {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setBook: React.Dispatch<React.SetStateAction<Book | null>>;
}

export default function SearchModal({ setModal, setBook }: SearchBook) {
  const result = useSelector((state: RootState) => state.searchResult.books);
  const selected = useSelector((state: RootState) => state.searchResult.selected);
  const [scrollY, setScrollY] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const onClickCancel = () => {
    setModal(false);
    dispatch(reset());
    setScrollY(0);
  };

  const onClickOk = () => {
    if (!selected) window.alert("책을 선택해주세요!");
    else {
      setBook(selected);
      setModal(false);
      dispatch(setSelected(null));
      dispatch(setResult([]));
      dispatch(setKeyword(""));
      setScrollY(0);
    }
  };

  useEffect(() => {
    // 책 선택 시 스크롤 초기화 방지
    if (listRef.current) {
      listRef.current.scrollTop = scrollY;
    }
  }, [scrollY]);

  const Content = () => {
    return (
      <>
        <div className={styles.searchbar}>
          <SearchBar placeholder="책 검색" />
        </div>
        <div className={styles.list} ref={listRef}>
          {result.map((book, i) => (
            <SearchBookItem book={book} listRef={listRef} setScrollY={setScrollY} key={i} />
          ))}
        </div>
      </>
    );
  };

  const Bottom = () => {
    return (
      <>
        <button onClick={onClickCancel} className="btn btn-light">
          취소
        </button>
        <button onClick={onClickOk} className="btn btn-primary">
          선택
        </button>
      </>
    );
  };

  return <Modal onClickOutside={onClickCancel} content={<Content />} bottom={<Bottom />} />;
}
