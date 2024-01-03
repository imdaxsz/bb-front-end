import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import { RootState } from "@/store/store";

import Menu from "./Menu";
import RecommendModal from "./RecommendModal";
import TopBar from "./TopBar";

export default function Root() {
  const { pathname } = useLocation();
  const modal = useSelector((state: RootState) => state.recommend.modal);

  return (
    <>
      {modal && <RecommendModal />}
      <TopBar />
      {["", "search", "recommend", "my_list", "book"].includes(
        pathname.split("/")[1],
      ) && <Menu />}
      <Outlet />
    </>
  );
}
