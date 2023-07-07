import { Outlet, useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import Home from "./Home";

export default function Root() {
  const { pathname } = useLocation();
  return (
    <div>
      <TopBar />
      {pathname === "/" && <Home/>}
      <Outlet />
    </div>
  )
}