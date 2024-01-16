import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { reset } from "store/recommendSlice";
import styles from "styles/item.module.scss";

interface Props {
  type: string;
  id: string;
  title: string;
  cover: string;
  children?: React.ReactNode;
  rec?: boolean;
}

export default function Item({ type, id, title, cover, children, rec }: Props) {
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
        <img src={cover} alt={title.split("-")[0]} loading="lazy" />
      </div>
      <div className={`${styles.title} ellipsis`}>{title}</div>
      {children && children}
    </Link>
  );
}
