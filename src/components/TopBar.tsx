import { Link } from 'react-router-dom';
import styles from '../styles/scss/bar.module.scss';

export default function TopBar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topbar}>
        <ul>
          <li className={styles.logo}>
            <Link to="/">북북</Link>
          </li>
          <div className={styles.right}>
            <li>
              <Link to="/write?mode=new">후기작성</Link>
            </li>
            <li>
              <Link to="/my">MY</Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
