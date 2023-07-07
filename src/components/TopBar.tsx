import styles from '../styles/scss/bar.module.scss';

export default function TopBar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topbar}>
        <ul>
          <li className={styles.logo}><a href="/">북북</a></li>
          <div className={styles.right}>
            <li>후기작성</li>
            <li><a href="/my">MY</a></li>
          </div>
        </ul>
      </div>
    </div>
  );
}
