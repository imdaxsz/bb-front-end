import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function Menu() {
  const pathname = useLocation().pathname.split("/")[1];
  const [style, setStyle] = useState("");
  const [filter, setFilter] = useState("최신순");
  const filterList = ["최신순", "오래된 순", "제목순"];
  const selectFilter = (e: React.MouseEvent<HTMLLIElement>, i: number) => {
    e.stopPropagation()
    setFilter(filterList[i]);
    setStyle("");
  };
  return (
    <div className="bar-wrapper menu-wrapper">
      <div className="menu">
        <ul>
          <div className="tab">
            <li className={pathname === "" ? "active" : ""}>후기</li>
            <li>탐색</li>
          </div>
          <div className="right">
            <li>
              <div className="dropdown" onClick={() => setStyle("block")}>
                <a href="#" role="button">
                  {filter}
                </a>
                <ul className={`dropdown-list ${style}`}>
                  {filterList.map((f, i) => (
                    <li key={i} onClick={(e) => selectFilter(e, i)}>
                      <a href="#" role="button" className={f === filter ? 'selected' : ''}>
                        {f}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <SearchBar placeholder="후기 검색" />
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
