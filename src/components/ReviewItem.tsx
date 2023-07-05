import { PiStarFill, PiStarLight } from "react-icons/pi";
import styles from '../styles/scss/reviewitem.module.scss'

export default function ReviewItem({score}:{score:number}) {
  return (
    <a href="/review/detail/1" className={styles.wrapper}>
      <div className={styles.thumnail}>
        <img src="https://shopping-phinf.pstatic.net/main_3243634/32436342677.20230704090706.jpg"></img>
      </div>
      <div className="title">우리가 빛의 속도로 갈 수 없다면</div>
      <div className={styles.score}>
        {[...Array(score)].map((a, i) => (
          <PiStarFill className="star" key={i} />
        ))}
        {[...Array(5 - score)].map((a, i) => (
          <PiStarLight className="star" key={i} />
        ))}
      </div>
    </a>
  );
}