import { PiStarFill, PiStarLight } from "react-icons/pi";
import styles from "../styles/item.module.scss";
import { Review } from "../types/types";
import Item from "./Item";

export default function ReviewItem({ review }: { review: Review }) {
  return (
    <Item type="review" id={review._id} title={review.book.title} image={review.book.image}>
      <div className={styles.rating}>
        {[...Array(review.rating)].map((a, i) => (
          <PiStarFill className="star" key={i} />
        ))}
        {[...Array(5 - review.rating)].map((a, i) => (
          <PiStarLight className="star" key={i} />
        ))}
      </div>
    </Item>
  );
}
