import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";
import styles from "../styles/scss/bar.module.scss";

export default function Menu() {
  const pathname = useLocation().pathname.split("/")[1];
  const [style, setStyle] = useState("");
  const filterList = ["최신순", "오래된 순", "제목순"];
  const [filter, setFilter] = useState(filterList[0]);
  const selectFilter = (e: React.MouseEvent<HTMLLIElement>, i: number) => {
    e.stopPropagation();
    setFilter(filterList[i]);
    setStyle("");
  };
  return (
    <div className={styles["menu-wrapper"]}>
      <div className={styles.menu}>
        <ul>
          <div className={styles.tab}>
            <li className={pathname === "" ? "active" : ""}>
              <Link to="/">후기</Link>
            </li>
            <li className={pathname === "my-list" ? "active" : ""}>
              <Link to="/my-list">관심도서</Link>
            </li>
            <li className={pathname === "recommend" ? "active" : ""}>
              <Link to="/recommend">추천도서</Link>
            </li>
          </div>
          <div className={styles.right}>
            <li>
              <div className="dropdown" onClick={() => setStyle("block")}>
                <Link to="/#" role="button">
                  {filter}
                </Link>
                <ul className={`dropdown-list ${style}`}>
                  {filterList.map((f, i) => (
                    <li key={i} onClick={(e) => selectFilter(e, i)}>
                      <Link to="/#" role="button" className={f === filter ? "selected" : ""}>
                        {f}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <div className={styles.searchbar}>
                <SearchBar placeholder={pathname === "" ? "후기 검색" : "제목, 저자명 검색"} />
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
