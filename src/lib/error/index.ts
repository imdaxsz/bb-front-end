import { store } from "store";
import { reset } from "store/authSlice";

/** @description Base error class */
export class BaseError extends Error {
  status?: number;

  constructor(name: string, message: string, status?: number) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

/** @description 500번대 이상 서버 에러 */
export class ServerError extends BaseError {
  constructor(message: string, status?: number) {
    super("ServerError", message, status);
  }
}

/** @description 400번대 서버 api 에러 */
export class ApiError extends BaseError {
  constructor(message: string, status?: number) {
    super("ApiError", message, status);
  }
}

// 401 토큰 만료 오류일 경우 처리
export const handleUnauthorizated = (
  error: unknown,
  option?: "alert" | "confirm",
  callback?: () => void,
) => {
  if (error instanceof ApiError && error.status === 401) {
    // alert 후 로그아웃 처리
    if (option === "alert") {
      window.alert("로그인 유지 시간이 만료되었어요!\n다시 로그인 해주세요.");
      store.dispatch(reset());
      return;
    }
    // 사용자가 확인 클릭 시에만 로그아웃 처리
    if (option === "confirm") {
      const ok = window.confirm(
        "로그인 유지 시간이 만료되었어요!\n로그인 페이지로 이동할까요?",
      );
      if (ok) store.dispatch(reset());
      return;
    }
    // 위 두 조건이 아닐 경우 바로 로그아웃 처리
    store.dispatch(reset());
    if (callback) callback();
  }
};
