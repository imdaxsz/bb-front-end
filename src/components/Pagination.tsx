import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/pagination.module.scss";

interface Props {
  totalItems: number;
  itemCountPerPage: number;
  pageCount: number;
  currentPage: number;
}

export default function Pagination({
  totalItems,
  itemCountPerPage,
  pageCount,
  currentPage,
}: Props) {
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const [start, setStart] = useState(1);
  const noPrev = start === 1;
  const noNext = start + pageCount - 1 >= totalPages;

  let url = window.location.href;
  if (url.includes("query") && url.includes("page")) url = url.split("page")[0];
  else if (url.includes("query")) url += "&";
  else url = url.split("?")[0] + "?";

  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
    window.scrollTo(0, 0);
  }, [currentPage, pageCount, start, url]);

  return (
    <div className={styles.wrapper}>
      <ul>
        <li className={`${styles.move} ${noPrev && styles.invisible}`}>
          <Link to={`${url}page=${start - 1}`}>이전</Link>
        </li>
        {[...Array(pageCount)].map((a, i) => (
          <React.Fragment key={i}>
            {start + i <= totalPages && (
              <li>
                <Link
                  className={`${styles.page} ${
                    currentPage === start + i && styles.active
                  }`}
                  to={`${url}page=${start + i}`}
                >
                  {start + i}
                </Link>
              </li>
            )}
          </React.Fragment>
        ))}
        <li className={`${styles.move} ${noNext && styles.invisible}`}>
          <Link to={`${url}page=${start + pageCount}`}>다음</Link>
        </li>
      </ul>
    </div>
  );
}
