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

export default function Write() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
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

  const onSubmit = (opt: "save" | "upload") => {
    console.log(opt);
    if (!book) window.alert("후기를 작성할 책을 선택해주세요!");
    else if (text === "") window.alert("후기 내용을 입력해주세요!");
    else {
      if (mode === "new") // 새 후기 저장
        api
          .post(
            `/api/review/new`,
            { book, rating, text, date: today, status: opt },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => navigate("/"));
      else // 후기 수정
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
    console.log("임시저장 글 리스트 모달 띄우기");
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
            console.log(res.data);
            setBook(res.data.book);
            setRating(res.data.rating);
            setText(res.data.text);
            setDate(getDate(new Date(res.data.date)));
          }
        });
    }
  }, [id, mode, token]);

  return (
    <>
      {modal && <SearchModal setModal={setModal} setBook={setBook} />}
      <TopBar write={{ mode: "new", savedCount: 1, onClick: onSubmit, onNumClick: showSavedReviews }} />
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
