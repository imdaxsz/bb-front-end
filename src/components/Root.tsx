import { Outlet, useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import Menu from "./Menu";

export default function Root() {
  const { pathname } = useLocation();

  return (
    <div>
      <TopBar />
      {["", "search", "recommend", "my_list", "book"].includes(pathname.split("/")[1]) && <Menu />}
      <Outlet />
    </div>
  );
}
