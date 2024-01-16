import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";

import useRecommend from "./useRecommend";
import { ReviewForm, ReviewHandlerType, addReviewFunType } from "./useReview";
import useSavedReview from "./useSavedReview";

interface Props {
  onChangeReview: ReviewHandlerType;
  loadReview: (id: string | null) => Promise<void>;
  addReview: addReviewFunType;
  updateReview: (id: string | null) => Promise<void>;
  review: ReviewForm;
  mode: string | null;
  id: string | null;
}

export default function useEditor({
  onChangeReview,
  loadReview,
  addReview,
  updateReview,
  review,
  mode,
  id,
}: Props) {
  const [searchModal, setSearchModal] = useState(false);
  const [savedModal, setSavedModal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { savedReviews, loadSavedReviews } = useSavedReview();

  const today = new Date();

  const { getRecommendBook } = useRecommend();

  const toggleSavedModal = () => setSavedModal((prev) => !prev);
  const toggleSearchModal = () => setSearchModal((prev) => !prev);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeReview({ text: e.target.value });
    // textarea 높이 조절
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  };

  const onSubmit = debounce(async (opt: "save" | "upload") => {
    if (!review.book) {
      window.alert("후기를 작성할 책을 선택해주세요!");
      return;
    }
    if (opt === "upload" && review.text === "") {
      window.alert("후기 내용을 입력해주세요!");
      return;
    }
    if (mode === "new") {
      // 새 후기 저장
      const id = await addReview(review, today, opt, savedReviews);
      if (id !== "" && opt === "upload") {
        // 새 후기 발행
        setIsLoading(true);
        // 후기 기반 도서 추천
        await getRecommendBook(id);
      }
      return;
    }
    // 후기 수정
    updateReview(id);
  }, 300);

  useEffect(() => {
    // 후기 수정일 경우
    if (mode === "edit") {
      loadReview(id);
      return;
    }
    loadSavedReviews(setIsLoading);
  }, [id, mode, loadReview, loadSavedReviews]);

  return {
    textareaRef,
    isEditorLoading: isLoading,
    searchModal,
    savedModal,
    toggleSavedModal,
    toggleSearchModal,
    onChange,
    onSubmit,
  };
}
