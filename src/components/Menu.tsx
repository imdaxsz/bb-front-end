import { Link, useLocation, useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";
import styles from "../styles/scss/bar.module.scss";

export default function Menu() {
  const pathname = useLocation().pathname.split("/")[1];
  const [style, setStyle] = useState("");
  const filterList = ["최신순", "오래된 순", "제목순"];
  const filterPath = ["", "sort=date_asc", "sort=title"];
  const [filter, setFilter] = useState(filterList[0]);
  const placeholder: Record<string, string> = { "": "도서명으로 후기 검색", "my_list": "제목 검색", "recommend": "제목, 저자명 검색" };

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("query");

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
            <li className={pathname === "my_list" ? "active" : ""}>
              <Link to="/my_list">관심도서</Link>
            </li>
            <li className={pathname === "recommend" ? "active" : ""}>
              <Link to="/recommend?page=1">추천도서</Link>
            </li>
          </div>

          {["", "search", "recommend", "my_list", "like"].includes(pathname) && (
            <div className={styles.right}>
              {pathname !== "recommend" && (
                <li>
                  <div className="dropdown" onClick={() => setStyle("block")}>
                    <Link to={window.location.href} role="button">
                      {filter}
                    </Link>
                    <ul className={`dropdown-list ${style}`}>
                      {filterList.map((f, i) => (
                        <li key={i} onClick={(e) => selectFilter(e, i)}>
                          <Link to={`?${filterPath[i]}`} role="button" className={f === filter ? "selected" : ""}>
                            {f}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )}
              <li>
                <div className={styles.searchbar}>
                  <SearchBar placeholder={placeholder[pathname]} keyword={keyword ? keyword : ""} />
                </div>
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
