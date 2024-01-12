import { lazy } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Root from "components/Root";
import Home from "routes/Home";
import { RootState } from "store";

const Leave = lazy(() => import("routes/Leave"));
const My = lazy(() => import("routes/My"));
const MyBookList = lazy(() => import("routes/MyBookList"));
const Recommend = lazy(() => import("routes/Recommend"));
const ReviewDetail = lazy(() => import("routes/ReviewDetail"));
const SearchResult = lazy(() => import("routes/SearchResult"));
const Write = lazy(() => import("routes/Write"));
const Signup = lazy(() => import("routes/Signup"));
const Signin = lazy(() => import("routes/Signin"));
const GoogleCallback = lazy(() => import("routes/GoogleCallback"));
const GoogleRedirect = lazy(() => import("routes/GoogleRedirect"));
const FindPassword = lazy(() => import("routes/FindPassword"));
const BookDetail = lazy(() => import("routes/BookDetail"));
const NotFound = lazy(() => import("routes/NotFound"));

export default function Router() {
  const token = useSelector((state: RootState) => state.auth.token);
  return (
    <Routes>
      <Route path="" element={<Root />}>
        <Route path="/" element={<Home />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/my_list" element={<MyBookList />} />
        <Route path="/book/detail/:id" element={<BookDetail />} />
        <Route path="/search/:filter" element={<SearchResult />} />
      </Route>
      <Route element={<PrivateRoutes token={token} />}>
        <Route path="" element={<Root />}>
          <Route path="/my" element={<My />} />
          <Route path="/review/detail/:id" element={<ReviewDetail />} />
          <Route path="/leave" element={<Leave />} />
        </Route>
        <Route path="/write" element={<Write />} />
      </Route>
      <Route element={<GuestOnlyRoutes token={token} />}>
        <Route path="/find_password" element={<FindPassword />} />
        <Route path="/find_password/next" element={<FindPassword />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        <Route path="/auth/google" element={<GoogleRedirect />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/next" element={<Signup />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

interface Props {
  token: string | null;
}

function GuestOnlyRoutes({ token }: Props) {
  return token ? <Navigate replace to="/" /> : <Outlet />;
}

const PrivateRoutes = ({ token }: Props) => {
  return token ? <Outlet /> : <Navigate replace to="/signin" />;
};
