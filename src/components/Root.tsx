import { Outlet, useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import Home from "./Home";
import Menu from "./Menu";

export default function Root() {
  const { pathname } = useLocation();
  return (
    <div>
      <TopBar />
      {["", "search", "recommend", "my-list"].includes(pathname.split("/")[1]) && <Menu />}
      {pathname === "/" && <Home />}
      <Outlet />
    </div>
  );
}