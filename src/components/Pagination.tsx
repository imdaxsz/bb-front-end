import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/scss/pagination.module.scss";

interface Props {
  totalItems: number;
  itemCountPerPage: number;
  pageCount: number;
  currentPage: number;
}

export default function Pagination({ totalItems, itemCountPerPage, pageCount, currentPage }: Props) {
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const [start, setStart] = useState(1);
  const noPrev = start === 1;
  const noNext = start + pageCount - 1 >= totalPages;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage]);

  return (
    <div className={styles.wrapper}>
      <ul>
        <li className={`${styles.move} ${noPrev && styles.visible}`}>
          <Link to={`?page=${start - 1}`}>이전</Link>
        </li>
        {[...Array(pageCount)].map((a, i) => (
          <>
            {start + i <= totalPages && (
              <li className={`${styles.page} ${currentPage === start + i && styles.active}`} key={i} onClick={() => navigate(`?page=${start + i}`)}>
                {start + i}
              </li>
            )}
          </>
        ))}
        <li className={`${styles.move} ${noNext && styles.visible}`}>
          <Link to={`?page=${start + pageCount}`}>다음</Link>
        </li>
      </ul>
    </div>
  );
}
