import { Outlet, useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import Menu from "./Menu";
import RecommendModal from "./RecommendModal";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Root() {
  const { pathname } = useLocation();
  const modal = useSelector((state: RootState) => state.recommend.modal);

  return (
    <div>
      {modal  && <RecommendModal />}
      <TopBar />
      {["", "search", "recommend", "my_list", "book"].includes(pathname.split("/")[1]) && <Menu />}
      <Outlet />
    </div>
  );
}
