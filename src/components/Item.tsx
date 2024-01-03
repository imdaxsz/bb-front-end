import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { reset } from "@/store/recommendSlice";
import styles from "@/styles/item.module.scss";

interface Props {
  type: string;
  id: string;
  title: string;
  image: string;
  children?: React.ReactNode;
  rec?: boolean;
}

export default function Item({ type, id, title, image, children, rec }: Props) {
  const dispatch = useDispatch();

  const closeRecModal = () => {
    if (rec) dispatch(reset());
  };

  return (
    <Link
      to={`/${type}/detail/${id}`}
      onClick={closeRecModal}
      className={styles.wrapper}
    >
      <div className={styles.thumnail}>
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className={`${styles.title} ellipsis`}>{title}</div>
      {children && children}
    </Link>
  );
}
