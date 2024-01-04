import { get, post, put } from "lib/api";
import { User } from "types";

/**
 * @description 회원가입
 * @param {string} email
 * @param {string} password
 */
export const signUp = (email: string, password: string) => {
  return post("/api/user/signup", { email, password });
};

/**
 * @description 로그인
 * @param {string} email
 * @param {string} password
 */
export const signIn = (email: string, password: string) => {
  return post<{ token: string }>("/api/user/signin", { email, password });
};

/**
 * @description 구글 로그인
 * @param {string} code
 * @return redirect url
 */
export const googleLogin = (code: string) => {
  return get<string>(`/auth/google?code=${code}`);
};

/**
 * @description 토큰 검증
 * @return 검증 여부 포함한 객체
 */
export const verifyToken = () => {
  return get<{ valid: boolean }>("/api/verify-token");
};

/**
 * @description 회원정보 조회
 */
export const getUser = () => {
  return get<User>(`/api/user/info`);
};

/**
 * @description 비밀번호 변경
 * @param {string} currentPw
 * @param {string} newPw
 */
export const changePassword = (currentPw: string, newPw: string) => {
  return put("/api/user/change_password", { currentPw, newPw });
};

/**
 * @description 비밀번호 분실 시 재설정
 * @param {string} email
 * @param {string} password
 */
export const resetPassword = (email: string, password: string) => {
  return put("/api/user/reset_password", { email, password });
};

// TODO: method del로 바꾸기
/**
 * @description 회원탈퇴
 * @param {string} password
 */
export const deleteAccount = (password: string) => {
  return post("/api/user/delete_account", { password });
};

/**
 * @description 이메일 중복 확인
 * @param {string} email
 */
export const checkEmail = (email: string) => {
  return post<{ exists: boolean }>("/api/user/checkemail", { email });
};

/**
 * @description 이메일 인증번호 요청
 * @param {string} email
 */
export const requestEmailCerti = (email: string) => {
  return post("/api/certification/send-email", { email });
};

/**
 * @description 인증번호 검증
 * @param {string} email
 * @param {string} code
 */
export const verifyCode = (email: string, code: string) => {
  return post<boolean>("/api/certification/verify-code", {
    email,
    userCode: code,
  });
};

/**
 * @description 이메일 인증 상태 확인
 * @param {string} email
 */
export const checkCertiStatus = (email: string) => {
  return get<boolean>(`/api/certification/certi-status/${email}`);
};
