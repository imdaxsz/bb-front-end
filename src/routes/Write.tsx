import { useRef, useState, useEffect } from "react";
import styles from "../styles/scss/write.module.scss";
import tb from "../styles/scss/bar.module.scss";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Search from "../components/Search";
import { BsPlusLg } from "react-icons/bs";
import { Book } from "../types/types";
import ReviewBookInfo from "../components/ReviewBookInfo";
import { getDate } from "../utils/getDate";
import api from "../api/api";

export default function Write() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const id = searchParams.get("logNo");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState("");
  const [book, setBook] = useState<Book | null>(null);
  const [rating, setRating] = useState(3);
  const [date, setDate] = useState("");
  const today = new Date();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!book) window.alert("후기를 작성할 책을 선택해주세요!");
    else if (text === "") window.alert("후기 내용을 입력해주세요!");
    else {
      if (mode === "new")
        api.post(`/api/review/new`, { book, rating, text, date: today }).then(() => navigate("/"));
      else
        api.put(`/api/review/${id}`, { rating, text }).then(() => navigate(`/review/detail/${id}`));
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

  useEffect(() => {
    setDate(getDate(today));

    // 후기 수정일 경우
    if (mode === "edit") {
      api.get(`/api/review/detail/${id}`).then((res) => {
        if (res.status === 200) {
          setBook(res.data.book);
          setRating(res.data.rating);
          setText(res.data.text);
          setDate(getDate(new Date(res.data.date)));
        }
      });
    }
  }, [id, mode]);

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
              <ReviewBookInfo book={book} setBook={setBook} rating={rating} setRating={setRating} isEdit={mode === "edit"} />
            )}
            <form id="review" onSubmit={onSubmit} method="POST">
              <div className={styles.date}>{date}</div>
              <textarea ref={textareaRef} value={text} onChange={onChange} placeholder="내용을 입력하세요" autoFocus className={styles.textarea} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
