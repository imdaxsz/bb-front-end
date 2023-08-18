import { setResult, setSelected } from "../store/searchResultSlice";
import { RootState } from "../store/store";
import styles from "../styles/scss/modal.module.scss";
import { Book } from "../types/types";
import SearchBookItem from "./SearchBookItem";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";

interface SearchBook {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setBook: React.Dispatch<React.SetStateAction<Book | null>>;
}

export default function SearchModal({ setModal, setBook }: SearchBook) {
  const result = useSelector((state: RootState) => state.searchResult.books);
  const selected = useSelector((state: RootState) => state.searchResult.selected);
  const dispatch = useDispatch();

  const onClickCancel = () => {
    setModal(false);
    dispatch(setSelected(null));
    dispatch(setResult([]));
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

  const Content = () => {
    return (
      <>
        <div className={styles.searchbar}>
          <SearchBar placeholder="책 검색" />
        </div>
        <div className={styles.list}>
          {result.map((book, i) => (
            <SearchBookItem book={book} key={i} />
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
