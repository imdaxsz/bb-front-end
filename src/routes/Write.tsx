import { useRef, useState } from "react";
import styles from "../styles/scss/write.module.scss";
import tb from "../styles/scss/bar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Search from "../components/Search";
import { BsPlusLg } from "react-icons/bs";
import { Book } from "../types/types";
import ReviewBookInfo from "../components/ReviewBookInfo";
import { getDate } from "../utils/getDate";
import axios from "axios";

export default function Write() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState("");
  const [book, setBook] = useState<Book | null>(null);
  const [rating, setRating] = useState(3);
  const date = new Date();
  const today = getDate(date);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!book) window.alert("후기를 작성할 책을 선택해주세요!");
    else if (text === "") window.alert("후기 내용을 입력해주세요!");
    else {
      axios.post(`http://localhost:8000/review/new`, { book, rating, text, date }).then(() => navigate("/"));
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
    // textarea 높이 조절
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  };

  return (
    <>
      {modal && <Search setModal={setModal} setBook={setBook} />}
      <div className={tb.wrapper}>
        <div className={`${tb.topbar} ${tb.write}`}>
          <ul>
            <li className={tb.logo}>
              <Link to="/">북북</Link>
            </li>
            <div className={tb.right}>
              <li>
                <span>저장</span>
              </li>
              <li>
                <button type="submit" form="review">
                  완료
                </button>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div className="wrapper">
        <div className={styles.wrapper}>
          <div className={styles.content}>
            {!book ? (
              <div className={styles["btn-add"]} onClick={() => setModal(true)}>
                <span>책 추가&nbsp;&nbsp;</span>
                <BsPlusLg size={23} />
              </div>
            ) : (
              <ReviewBookInfo book={book} setBook={setBook} rating={rating} setRating={setRating} />
            )}
            <form id="review" onSubmit={onSubmit} method="POST">
              <div className={styles.date}>{today}</div>
              <textarea ref={textareaRef} value={text} onChange={onChange} placeholder="내용을 입력하세요" autoFocus className={styles.textarea} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
