import { useRef, useState, useEffect } from "react";
import styles from "../styles/scss/write.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchModal from "../components/SearchModal";
import { BsPlusLg } from "react-icons/bs";
import { Book } from "../types/types";
import ReviewBookInfo from "../components/ReviewBookInfo";
import { getDate } from "../utils/getDate";
import api from "../api/api";
import TopBar from "../components/TopBar";
import SavedList from "../components/SavedList";
import { loadReviews, saveReview } from "../utils/review";

export default function Write() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [savedModal, setSavedModal] = useState(false);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const id = searchParams.get("logNo");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState("");
  const [book, setBook] = useState<Book | null>(null);
  const [rating, setRating] = useState(3);
  const today = new Date();
  const [date, setDate] = useState(getDate(today));

  const token = localStorage.getItem("token");
  const [savedCount, setSavedCount] = useState(0);

  const onSubmit = (opt: "save" | "upload") => {
    if (!book) window.alert("후기를 작성할 책을 선택해주세요!");
    else if (opt === "upload" && text === "") window.alert("후기 내용을 입력해주세요!");
    else {
      if (mode === "new") {
        // 새 후기 저장
        saveReview(book, rating, today, text, opt, token).then((res) => {
          if (res !== "") {
            navigate(`/review/detail/${res}`);
          } 
        });
      }
      // 후기 수정
      else
        api
          .put(
            `/api/review/${id}`,
            { rating, text },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => navigate(`/review/detail/${id}`));
    }
  };

  const showSavedReviews = () => {
    setSavedModal(true);
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
    // 후기 수정일 경우
    if (mode === "edit") {
      api
        .get(`/api/review/detail/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setBook(res.data.book);
            setRating(res.data.rating);
            setText(res.data.text);
            setDate(getDate(new Date(res.data.date)));
          }
        });
    } else {
      loadReviews(token, undefined, setSavedCount);
    }
  }, [id, mode, token]);

  return (
    <>
      {modal && <SearchModal setModal={setModal} setBook={setBook} />}
      {savedModal && <SavedList setModal={setSavedModal} setBook={setBook} setText={setText} setRating={setRating} token={token} />}
      <TopBar write={{ mode: mode ? mode : "new", savedCount, onClick: onSubmit, onNumClick: showSavedReviews }} />
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
            <form>
              <div className={styles.date}>{date}</div>
              <textarea ref={textareaRef} value={text} onChange={onChange} placeholder="내용을 입력하세요" autoFocus className={styles.textarea} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
