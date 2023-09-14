import { setBookInfo } from "../utils/setBookInfo";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setRecBook, setRecModal } from "../store/recommendSlice";
import { RootState } from "../store/store";

export default function useRecommend() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const categoryId = useSelector((state: RootState) => state.searchResult.categoryId);

  const getRecommendBook = async (id: string, token: string | null) => {
    const res = await api.post(
      `/api/recommend/foryou`,
      { categoryId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      dispatch(setRecBook(setBookInfo([res.data])[0]));
      dispatch(setRecModal(true));
      navigate(`/review/detail/${id}`);
    }
  };

  const checkUserRecommend = async (token: string | null) => {
    const res = await api.get(`/api/recommend`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  };

  return { checkUserRecommend, getRecommendBook };
}
