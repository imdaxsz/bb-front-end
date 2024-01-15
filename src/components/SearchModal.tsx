import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ReviewHandlerType } from "hooks/useReview";
import { RootState } from "store";
import styles from "styles/modal.module.scss";

import {
  reset,
  setKeyword,
  setResult,
  setSelected,
} from "../store/searchResultSlice";

import Loader from "./Loader";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import SearchBookItem from "./SearchBookItem";

interface SearchBook {
  onClose: () => void;
  setBook: ReviewHandlerType;
}

export default function SearchModal({ onClose, setBook }: SearchBook) {
  const result = useSelector((state: RootState) => state.searchResult.books);
  const selected = useSelector(
    (state: RootState) => state.searchResult.selected,
  );
  const [scrollY, setScrollY] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onClickCancel = () => {
    onClose();
    dispatch(reset());
    setScrollY(0);
  };

  const onClickOk = () => {
    if (!selected) {
      window.alert("책을 선택해주세요!");
      return;
    }
    setBook({ book: selected });
    onClose();
    dispatch(setSelected(null));
    dispatch(setResult([]));
    dispatch(setKeyword(""));
    setScrollY(0);
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
          <SearchBar placeholder="책 검색" setLoading={setLoading} />
        </div>
        <div className={styles.list} ref={listRef}>
          {loading && <Loader />}
          {result &&
            result.map((book, i) => (
              <SearchBookItem
                book={book}
                listRef={listRef}
                setScrollY={setScrollY}
                key={i}
              />
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

  return (
    <Modal
      onClickOutside={onClickCancel}
      content={<Content />}
      bottom={<Bottom />}
    />
  );
}
