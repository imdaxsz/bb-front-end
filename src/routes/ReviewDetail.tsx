import { PiStarFill, PiStarLight } from "react-icons/pi";
import styles from "../styles/scss/detail.module.scss";
export default function ReviewDetail() {
  const score = 3;
  return (
    <div className="wrapper">
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <div className={styles.tool}>
            <div className={styles.icon}>수정</div>
            <div className={styles.icon}>삭제</div>
          </div>
          <div className={styles.book}>
            <div className={styles.thumnail}>
              <img src="https://shopping-phinf.pstatic.net/main_3527242/35272422624.20221229074357.jpg" alt="thumnail"></img>
            </div>
            <div className={styles.info}>
              <div className={styles.title}>망그러진 만화</div>
              {/* <div className={styles.title}>미국 연방자동차안전기준 202 승객용 차량을 위한 머리지지대 제정에 대한 입법평가 사례분석</div> */}
              <div className={styles["sub-info"]}>유랑</div>
              <div className={styles["sub-info"]}>좋은생각</div>
              <div className={styles.score}>
                {[...Array(score)].map((a, i) => (
                  <PiStarFill className="star-lg" key={i} />
                ))}
                {[...Array(5 - score)].map((a, i) => (
                  <PiStarLight className="star-lg" key={i} />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <div>2023년 7월 5일 수요일</div>
            <div>후기내용입니더 하하하하하</div>
          </div>
        </div>
      </div>
    </div>
  );
}
