import { PiStarFill, PiStarLight } from "react-icons/pi";
import styles from "../styles/scss/reviewitem.module.scss";
import { Link } from "react-router-dom";
import { Review } from "../types/types";

export default function ReviewItem({ review }: { review: Review }) {
  return (
    <Link to={`/review/detail/${review._id}`} className={styles.wrapper}>
      <div className={styles.thumnail}>
        <img src={review.book.image} alt="thumnail"></img>
      </div>
      <div className="title">{review.book.title}</div>
      <div className={styles.rating}>
        {[...Array(review.rating)].map((a, i) => (
          <PiStarFill className="star" key={i} />
        ))}
        {[...Array(5 - review.rating)].map((a, i) => (
          <PiStarLight className="star" key={i} />
        ))}
      </div>
    </Link>
  );
}
