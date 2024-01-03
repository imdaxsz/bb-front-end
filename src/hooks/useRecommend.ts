import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "api";
import { setRecBook, setRecModal } from "store/recommendSlice";
import { RootState } from "store/store";
import { setBookInfo } from "utils/setBookInfo";

import useSignOut from "./useSignout";

export default function useRecommend() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryId = useSelector(
    (state: RootState) => state.searchResult.categoryId,
  );

  const { signOut } = useSignOut();

  // 추천 도서 데이터 요청
  const getRecommendBook = async (id: string, token: string | null) => {
    const res = await api.post(
      `/api/recommend/foryou`,
      { categoryId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.status === 200 && res.data !== "Recommend not used") {
      dispatch(setRecBook(setBookInfo([res.data])[0]));
      dispatch(setRecModal(true));
    } else if (res.status === 403) signOut();
    navigate(`/review/detail/${id}`);
  };

  return { getRecommendBook };
}
