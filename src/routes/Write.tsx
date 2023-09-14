import { useRef, useState, useEffect } from "react";
import styles from "../styles/scss/write.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchModal from "../components/SearchModal";
import { BsPlusLg } from "react-icons/bs";
import ReviewBookInfo from "../components/ReviewBookInfo";
import TopBar from "../components/TopBar";
import SavedList from "../components/SavedList";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Loading from "../components/Loading";
import useReview from "../hooks/useReview";
import useSavedReview from "../hooks/useSavedReview";
import useRecommend from "../hooks/useRecommend";

export default function Write() {
  const navigate = useNavigate();
  const [searchModal, setSearchModal] = useState(false);
  const [savedModal, setSavedModal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const id = searchParams.get("logNo");
  const today = new Date();

  const token = useSelector((state: RootState) => state.auth.token);

  const { book, setBook, text, setText, rating, setRating, date, loading, setLoading, loadReview, addReview, updateReview } = useReview();
  const { loadSavedReviews } = useSavedReview();
  const { checkUserRecommend, getRecommendBook } = useRecommend();

  const onSubmit = async (opt: "save" | "upload") => {
    if (!book) window.alert("후기를 작성할 책을 선택해주세요!");
    else if (opt === "upload" && text === "") window.alert("후기 내용을 입력해주세요!");
    else {
      if (mode === "new") {
        // 새 후기 저장
        const id = await addReview(book, rating, today, text, opt, token);
        if (id !== "" && opt === "upload") {
          setLoading(true);
          // 새 후기 발행
          // 추천 기능 사용 여부 확인
          const res = await checkUserRecommend(token);
          if (res.status === 200 && res.data === true) {
            await getRecommendBook(id, token);
            setLoading(false);
          } else navigate(`/review/detail/${id}`);
        }
      }
      // 후기 수정
      else updateReview(id, token);
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

  const showSavedReviews = () => {
    setSavedModal(true);
  };

  useEffect(() => {
    // 후기 수정일 경우
    if (mode === "edit") loadReview(id, token);
    else loadSavedReviews(token);
  }, [id, mode, token, loadReview, loadSavedReviews]);

  return (
    <>
      {loading && <Loading />}
      {searchModal && <SearchModal setModal={setSearchModal} setBook={setBook} />}
      {savedModal && <SavedList setModal={setSavedModal} setBook={setBook} setText={setText} setRating={setRating} token={token} />}
      <TopBar write={{ mode: mode ? mode : "new", onClick: onSubmit, onNumClick: showSavedReviews }} />
      <div className="wrapper">
        {!loading && (
          <div className={styles.wrapper}>
            <div className={styles.content}>
              {!book ? (
                <div className={styles["btn-add"]} onClick={() => setSearchModal(true)}>
                  <span>책 추가&nbsp;&nbsp;</span>
                  <BsPlusLg size={23} />
                </div>
              ) : (
                <ReviewBookInfo book={book} setBook={setBook} rating={rating} setRating={setRating} isEdit={mode === "edit"} />
              )}
              <form>
                <div className={styles.date}>{date}</div>
                <textarea ref={textareaRef} value={text} onChange={onChange} placeholder="내용을 입력하세요" className={styles.textarea} />
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
