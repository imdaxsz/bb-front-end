import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import styles from "styles/bar.module.scss";

import SearchBar from "./SearchBar";

export default function Menu() {
  const fullPath = useLocation().pathname;
  const pathname = fullPath.split("/")[1];
  const [style, setStyle] = useState("");
  const filterList = ["최신순", "오래된 순", "제목순"];
  const filterPath = ["", "sort=date_asc", "sort=title"];
  const [filter, setFilter] = useState(filterList[0]);
  const placeholder: Record<string, string> = {
    "": "도서명으로 후기 검색",
    my_list: "제목 검색",
    recommend: "제목 검색",
  };

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("query");

  const isMobile = useMediaQuery({ maxWidth: 650 });
  const [showMbSearch, setShowMbSearch] = useState(false);

  const selectFilter = (e: React.MouseEvent<HTMLLIElement>, i: number) => {
    e.stopPropagation();
    setFilter(filterList[i]);
    setStyle("");
  };

  const onClickSearchbar = () => {
    if (isMobile) setShowMbSearch(true);
  };

  const onClickCancel = () => {
    setShowMbSearch(false);
  };

  return (
    <div className={styles["menu-wrapper"]}>
      <div className={styles.menu}>
        {isMobile && (
          <ul
            className={`${styles["mobile-search"]} ${
              showMbSearch && styles.show
            }`}
          >
            <li>
              <div className={styles["mobile-searchbar"]}>
                <SearchBar
                  placeholder={placeholder[pathname]}
                  keyword={keyword ? keyword : ""}
                />
              </div>
            </li>
            <li onClick={onClickCancel}>
              <span>취소</span>
            </li>
          </ul>
        )}
        <ul>
          <div className={styles.tab}>
            <li
              className={
                ["/", "/search/review"].includes(fullPath) ? "active" : ""
              }
            >
              <Link to="/">후기</Link>
            </li>
            <li className={fullPath.includes("my_list") ? "active" : ""}>
              <Link to="/my_list">관심도서</Link>
            </li>
            <li
              className={
                ["/recommend", "/search/book"].includes(fullPath)
                  ? "active"
                  : ""
              }
            >
              <Link to="/recommend?page=1">추천도서</Link>
            </li>
          </div>

          {["", "search", "recommend", "my_list", "like"].includes(
            pathname,
          ) && (
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
                          <Link
                            to={`?${filterPath[i]}`}
                            role="button"
                            className={f === filter ? "selected" : ""}
                          >
                            {f}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )}
              <li>
                {isMobile ? (
                  <div
                    className={styles["mb-search-icon"]}
                    onClick={onClickSearchbar}
                  >
                    <FiSearch size={20} />
                  </div>
                ) : (
                  <div className={styles.searchbar}>
                    <SearchBar
                      placeholder={placeholder[pathname]}
                      keyword={keyword ? keyword : ""}
                    />
                  </div>
                )}
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
