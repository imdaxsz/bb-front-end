import { BsPlusLg } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";

import Head from "components/Head";
import Loader from "components/Loader";
import ReviewBookInfo from "components/ReviewBookInfo";
import SavedList from "components/SavedList";
import SearchModal from "components/SearchModal";
import TopBar from "components/TopBar";
import useEditor from "hooks/useEditor";
import useReview from "hooks/useReview";
import styles from "styles/write.module.scss";

export default function Write() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const id = searchParams.get("logNo");

  const {
    review,
    onChangeReview,
    addReview,
    updateReview,
    date,
    loading,
    loadReview,
  } = useReview();

  const {
    textareaRef,
    isEditorLoading,
    searchModal,
    savedModal,
    toggleSavedModal,
    toggleSearchModal,
    onChange,
    onSubmit,
  } = useEditor({
    onChangeReview,
    loadReview,
    addReview,
    updateReview,
    review,
    mode,
    id,
  });

  return (
    <>
      <Head title="에디터 | 북북" />
      {(loading || isEditorLoading) && <Loader />}
      {searchModal && (
        <SearchModal onClose={toggleSearchModal} setBook={onChangeReview} />
      )}
      {savedModal && (
        <SavedList onClose={toggleSavedModal} setReview={onChangeReview} />
      )}
      {!loading && !isEditorLoading && (
        <>
          <TopBar
            write={{
              mode: mode ? mode : "new",
              onClick: onSubmit,
              onNumClick: toggleSavedModal,
            }}
          />
          <div className="wrapper">
            <div className={styles.wrapper}>
              <div className={styles.content}>
                {!review.book ? (
                  <div
                    className={styles["btn-add"]}
                    onClick={toggleSearchModal}
                  >
                    <span>책 추가&nbsp;&nbsp;</span>
                    <BsPlusLg size={23} />
                  </div>
                ) : (
                  <ReviewBookInfo
                    book={review.book}
                    setRating={onChangeReview}
                    rating={review.rating}
                    isEdit={mode === "edit"}
                  />
                )}
                <form>
                  <div className={styles.date}>{date}</div>
                  <textarea
                    ref={textareaRef}
                    value={review.text}
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
