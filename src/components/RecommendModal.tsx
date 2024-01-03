import { useDispatch, useSelector } from "react-redux";

import { reset } from "@/store/recommendSlice";
import { RootState } from "@/store/store";
import styles from "@/styles/modal.module.scss";
import { setRecommend } from "@/utils/recommend";

import BookItem from "./BookItem";
import Modal from "./Modal";

export default function RecommendModal() {
  const book = useSelector((state: RootState) => state.recommend.book);
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const onClickCancel = () => {
    dispatch(reset());
  };

  const onNoMoreRec = () => {
    setRecommend(token);
    dispatch(reset());
  };

  const Content = () => {
    return (
      <>
        <div className={styles.title}>당신을 위한 추천</div>
        <span className={styles.des}>
          다음엔 뭘 읽어볼까? 이런 책은 어때요?
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "30px 0",
          }}
        >
          {book && <BookItem book={book} rec />}
        </div>
      </>
    );
  };

  const Bottom = () => {
    return (
      <>
        <button className="btn btn-light" onClick={onNoMoreRec}>
          추천 그만 받기
        </button>
        <button onClick={onClickCancel} className="btn btn-neutral">
          닫기
        </button>
      </>
    );
  };

  return (
    <Modal
      onClickOutside={onClickCancel}
      content={<Content />}
      bottom={<Bottom />}
      size="md"
    />
  );
}
