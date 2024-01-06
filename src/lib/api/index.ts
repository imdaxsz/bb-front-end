import axios from "axios";

import { ApiError, BaseError, ServerError } from "lib/error";
import { store } from "store";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
  timeout: 5 * 1000,
});

instance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) config.headers["authorization"] = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status >= 400 && error.response?.status < 500) {
      const { message } = error.response.data;
      return Promise.reject(new ApiError(message, error.response.status));
    }
    if (error.response?.status >= 500) {
      const { message } = error.response.data;
      return Promise.reject(new ServerError(message, error.response.status));
    }

    if (error.message.startsWith("timeout")) {
      return Promise.reject(new BaseError("Timeout Error", "Network timeout"));
    }

    return Promise.reject(new BaseError("Unknown Error", error.message));
  },
);

export function get<T>(...args: Parameters<typeof instance.get>) {
  return instance.get<T, T>(...args);
}
export function post<T>(...args: Parameters<typeof instance.post>) {
  return instance.post<T, T>(...args);
}
export function put<T>(...args: Parameters<typeof instance.put>) {
  return instance.put<T, T>(...args);
}
export function patch<T>(...args: Parameters<typeof instance.patch>) {
  return instance.patch<T, T>(...args);
}
export function del<T>(...args: Parameters<typeof instance.delete>) {
  return instance.delete<T, T>(...args);
}
export default {
  get,
  post,
  put,
  patch,
  delete: del,
};
