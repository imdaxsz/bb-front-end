import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "components/PrivateRoute";
import Root from "components/Root";
import BookDetail from "routes/BookDetail";
import FindPassword from "routes/FindPassword";
import GoogleCallback from "routes/GoogleCallback";
import GoogleRedirect from "routes/GoogleRedirect";
import Home from "routes/Home";
import Leave from "routes/Leave";
import My from "routes/My";
import MyBookList from "routes/MyBookList";
import NotFound from "routes/NotFound";
import Recommend from "routes/Recommend";
import ReviewDetail from "routes/ReviewDetail";
import SearchResult from "routes/SearchResult";
import Signin from "routes/Signin";
import Signup from "routes/Signup";
import Write from "routes/Write";
import { RootState } from "store";

export default function Router() {
  const token = useSelector((state: RootState) => state.auth.token);
  return (
    <Routes>
      <Route path="" element={<Root />}>
        <Route path="/" element={<Home />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/my_list" element={<MyBookList />} />
        <Route path="/book/detail/:id" element={<BookDetail />} />
        <Route
          path="/my"
          element={<PrivateRoute component={<My />} token={token} />}
        />
        <Route
          path="/review/detail/:id"
          element={<PrivateRoute component={<ReviewDetail />} token={token} />}
        />
        <Route path="/search/:filter" element={<SearchResult />} />
        <Route
          path="/leave"
          element={<PrivateRoute component={<Leave />} token={token} />}
        />
      </Route>
      <Route
        path="/write"
        element={<PrivateRoute component={<Write />} token={token} />}
      />
      <Route
        path="/find_password"
        element={token ? <Navigate replace to="/" /> : <FindPassword />}
      />
      <Route
        path="/find_password/next"
        element={token ? <Navigate replace to="/" /> : <FindPassword />}
      />
      <Route
        path="/signin"
        element={token ? <Navigate replace to="/" /> : <Signin />}
      />
      <Route
        path="/auth/google/callback"
        element={token ? <Navigate replace to="/" /> : <GoogleCallback />}
      />
      <Route
        path="/auth/google"
        element={token ? <Navigate replace to="/" /> : <GoogleRedirect />}
      />
      <Route
        path="/signup"
        element={token ? <Navigate replace to="/" /> : <Signup />}
      />
      <Route
        path="/signup/next"
        element={token ? <Navigate replace to="/" /> : <Signup />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
