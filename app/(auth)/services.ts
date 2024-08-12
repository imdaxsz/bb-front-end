import { nextFetch } from '@/libs/fetch'

class AuthApi {
  /**
   * @description 구글 로그인
   * @returns token
   */
  async fetchGoogleSignToken(code: string) {
    return nextFetch<{ token: string }>(
      `${process.env.NEXT_PUBLIC_API_ROOT}/auth/google?code=${code}`,
    ).then((res) => res.body)
  }

  /**
   * @description 이메일 로그인
   * @returns token
   */
  async requestEmailSignIn({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    return nextFetch<{ token: string }>(
      `${process.env.NEXT_PUBLIC_API_ROOT}/api/user/signin`,
      {
        method: 'POST',
        body: { email, password },
      },
    ).then((res) => res.body)
  }

  /**
   * @description 이메일 중복 확인
   * @param {string} email
   */
  async checkEmail(email: string) {
    return nextFetch<{ exists: boolean }>('/api/user/checkemail', {
      method: 'POST',
      body: { email },
    }).then((res) => res.body)
  }

  /**
   * @description 이메일 인증번호 요청
   * @param {string} email
   */
  async requestEmailCertification(email: string) {
    return nextFetch<{ exists: boolean }>('/api/certification/send-email', {
      method: 'POST',
      body: { email },
    }).then((res) => res.body)
  }

  /**
   * @description 인증번호 검증
   * @param {string} email
   * @param {string} code
   */
  async verifyCode(email: string, code: string) {
    return nextFetch<{ exists: boolean }>('/api/certification/verify-code', {
      method: 'POST',
      body: { email, userCode: code },
    }).then((res) => res.body)
  }

  /**
   * @description 이메일 인증 상태 확인
   * @param {string} email
   */
  async checkCertiStatus(email: string) {
    return nextFetch<{ certified: boolean }>(
      `/api/certification/certi-status/${email}`,
    ).then((res) => res.body)
  }

  /**
   * @description 회원가입
   * @param {string} email
   * @param {string} password
   */
  async signUp(email: string, password: string) {
    return nextFetch('/api/user/signup', {
      method: 'POST',
      body: { email, password },
    }).then((res) => res.body)
  }

  /**
   * @description 비밀번호 분실 시 재설정
   * @param {string} email
   * @param {string} password
   */
  async resetPassword(email: string, password: string) {
    return nextFetch('/api/user/reset_password', {
      method: 'PATCH',
      body: { email, password },
    }).then((res) => res.body)
  }

  /**
   * @description 회원탈퇴
   * @param {string} password
   */
  async deleteAccount(password: string) {
    return nextFetch('/api/user/delete_account', {
      method: 'DELETE',
      body: { password },
    })
  }
}

export default new AuthApi()
