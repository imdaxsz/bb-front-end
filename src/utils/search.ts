import { AxiosResponse } from "axios";

import api from "api";

export type getSearchResultType = (
  page: string | null,
  keyword: string | null,
  searchType: string,
  token?: string | null,
) => void;

type SearchFunType = (
  page: string | null,
  keyword: string | null,
  searchType: string,
  token?: string | null,
) => Promise<AxiosResponse>;

export const Search: SearchFunType = async (
  page,
  keyword,
  searchType,
  token,
) => {
  switch (searchType) {
    case "review":
      return api.get(`/api/search/review?query=${keyword}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    case "my_list":
      return api.get(`/api/search/my_list?query=${keyword}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    default:
      return api.get(`/api/search/book?&page=${page}&query=${keyword}`);
  }
};
