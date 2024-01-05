import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { recommend } from "api/RecommendApi";
import { RootState } from "store";
import { setRecBook, setRecModal } from "store/recommendSlice";
import { setBookInfo } from "utils/setBookInfo";

export default function useRecommend() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryId = useSelector(
    (state: RootState) => state.searchResult.categoryId,
  );

  // 추천 도서 데이터 요청
  const getRecommendBook = async (id: string) => {
    try {
      const res = await recommend(categoryId);
      if (typeof res !== "string") {
        dispatch(setRecBook(setBookInfo([res])[0]));
        dispatch(setRecModal(true));
      }
      navigate(`/review/detail/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return { getRecommendBook };
}
