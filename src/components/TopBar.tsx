export default function TopBar() {
  return (
    <div className="bar-wrapper">
      <div className="topbar">
        <ul>
          <li className="logo">북북</li>
          <div className="right">
            <li>후기작성</li>
            <li>
              <a href="/login">MY</a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
