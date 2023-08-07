import styles from "../styles/scss/item.module.scss";
import { Link } from "react-router-dom";

interface Props {
  type: string;
  id: string;
  title: string;
  image: string;
  children?: React.ReactNode;
}

export default function Item({ type, id, title, image, children }: Props) {
  return (
    <Link to={`/${type}/detail/${id}`} className={styles.wrapper}>
      <div className={styles.thumnail}>
        <img src={image} alt="thumnail"></img>
      </div>
      <div className={`${styles.title} ellipsis`}>{title}</div>
      {children && children}
    </Link>
  );
}
