import api from "@/api";

type SetRecommendFun = (token: string | null) => Promise<number>;

export const setRecommend: SetRecommendFun = async (token) => {
  return api
    .post(
      `/api/recommend`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => res.status);
};
