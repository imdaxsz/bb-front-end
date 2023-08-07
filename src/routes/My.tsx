import styles from '../styles/scss/my.module.scss';
import inputstyles from '../styles/scss/auth.module.scss';
import { useState } from 'react';

export default function My() {
  const [active, setActive] = useState(true);

  const onRecommendClick = () => {
    setActive((prev) => !prev);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles["item-wrapper"]}>
          <span className={styles.title}>이메일</span>
          <span className={styles["user-info"]}>s2809h29@gmail.com</span>
          <button className={styles["btn-white"]}>로그아웃</button>
        </div>
        <div className={styles["password-wrapper"]}>
          <div className={styles.title}>비밀번호 재설정</div>
          <div className={styles.password}>
            <input className={inputstyles.input} placeholder="현재 비밀번호"></input>
            <input className={inputstyles.input} placeholder="새 비밀번호"></input>
            <input className={inputstyles.input} placeholder="새 비밀번호 확인"></input>
            <button className={styles["btn-primary"]}>변경</button>
          </div>
        </div>
        <div className={styles["item-wrapper"]}>
          <span className={styles["title-md"]}>후기 작성 후 책 추천</span>
          <div className={`toggle ${active === true ? 'toggle-active' : ''}`} onClick={onRecommendClick}>
            <div className="circle"/>
          </div>
        </div>
        <div className={styles["item-wrapper"]}>
          <span className={styles["title-md"]}>후기 데이터 다운로드</span>
          <button className={styles["btn-primary"]}>데이터 요청하기</button>
        </div>
        <div className={styles["item-wrapper"]}>
          <a href="/#">회원 탈퇴</a>
        </div>
      </div>
    </div>
  );
}