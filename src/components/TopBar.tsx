import { Link } from "react-router-dom";
import styles from "../styles/scss/bar.module.scss";

interface Props {
  write?: {
    mode: string;
    savedCount: number;
    onClick: (opt: "save" | "upload") => void;
    onNumClick: () => void;
  };
}

export default function TopBar({ write }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.topbar} ${write && styles["topbar-light"]}`}>
        <ul>
          <li className={styles.logo}>
            <Link to="/">북북</Link>
          </li>
          <div className={styles.right}>
            {!write ? (
              <>
                <li>
                  <Link to="/write?mode=new">후기작성</Link>
                </li>
                <li>
                  <Link to="/my">MY</Link>
                </li>
              </>
            ) : (
              <>
                {write.mode === "new" && (
                  <li>
                    <button className={styles.save}>
                      <span onClick={() => write.onClick("save")}>저장</span>
                      {write.savedCount > 0 && (
                        <span onClick={write.onNumClick} className={styles.number}>
                          {write.savedCount}
                        </span>
                      )}
                    </button>
                  </li>
                )}
                <li>
                  <button className={styles.upload} onClick={() => write.onClick("upload")}>
                    완료
                  </button>
                </li>
              </>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}
