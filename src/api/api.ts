import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
  timeout: 3 * 1000,
});

const isAxiosError = (error: unknown) => {
  return axios.isAxiosError(error);
};

export default api;
export { AxiosError, isAxiosError };
