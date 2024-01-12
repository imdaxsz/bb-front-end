import { useRef, useState, useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Head from "components/Head";
import Loading from "components/Loading";
import ReviewBookInfo from "components/ReviewBookInfo";
import SavedList from "components/SavedList";
import SearchModal from "components/SearchModal";
import TopBar from "components/TopBar";
import useRecommend from "hooks/useRecommend";
import useReview from "hooks/useReview";
import useSavedReview from "hooks/useSavedReview";
import { RootState } from "store";
import styles from "styles/write.module.scss";

export default function Write() {
  const [searchModal, setSearchModal] = useState(false);
  const [savedModal, setSavedModal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const id = searchParams.get("logNo");
  const today = new Date();

  const {
    book,
    setBook,
    text,
    setText,
    rating,
    setRating,
    date,
    loading,
    setLoading,
    loadReview,
    addReview,
    updateReview,
  } = useReview();
  const { reviews, loadSavedReviews } = useSavedReview();
  const { getRecommendBook } = useRecommend();

  const savedCount = useSelector((state: RootState) => state.savedReview.count);

  const onSubmit = async (opt: "save" | "upload") => {
    if (!book) window.alert("후기를 작성할 책을 선택해주세요!");
    else if (opt === "upload" && text === "")
      window.alert("후기 내용을 입력해주세요!");
    else {
      if (mode === "new") {
        // 새 후기 저장
        const id = await addReview(book, rating, today, text, opt, reviews);
        if (id !== "" && opt === "upload") {
          // 새 후기 발행
          setLoading(true);
          // 후기 기반 도서 추천
          await getRecommendBook(id);
        }
      }
      // 후기 수정
      else updateReview(id);
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
    if (mode === "edit") loadReview(id);
    else loadSavedReviews(setLoading);
  }, [id, mode, loadReview, loadSavedReviews, setLoading, savedCount]);

  return (
    <>
      <Head title="에디터 | 북북" />
      {loading && <Loading />}
      {searchModal && (
        <SearchModal setModal={setSearchModal} setBook={setBook} />
      )}
      {savedModal && (
        <SavedList
          setModal={setSavedModal}
          setBook={setBook}
          setText={setText}
          setRating={setRating}
        />
      )}
      {!loading && (
        <>
          <TopBar
            write={{
              mode: mode ? mode : "new",
              onClick: onSubmit,
              onNumClick: showSavedReviews,
            }}
          />
          <div className="wrapper">
            <div className={styles.wrapper}>
              <div className={styles.content}>
                {!book ? (
                  <div
                    className={styles["btn-add"]}
                    onClick={() => setSearchModal(true)}
                  >
                    <span>책 추가&nbsp;&nbsp;</span>
                    <BsPlusLg size={23} />
                  </div>
                ) : (
                  <ReviewBookInfo
                    book={book}
                    setBook={setBook}
                    rating={rating}
                    setRating={setRating}
                    isEdit={mode === "edit"}
                  />
                )}
                <form>
                  <div className={styles.date}>{date}</div>
                  <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={onChange}
                    placeholder="내용을 입력하세요"
                    className={styles.textarea}
                  />
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
