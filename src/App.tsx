import { Routes, Route, Navigate } from "react-router-dom";
import FindPassword from "./routes/FindPassword";
import Signup from "./routes/Signup";
import ReviewDetail from "./routes/ReviewDetail";
import My from "./routes/My";
import Root from "./components/Root";
import Recommend from "./routes/Recommend";
import MyBookList from "./routes/MyBookList";
import Write from "./routes/Write";
import SearchResult from "./routes/SearchResult";
import Home from "./routes/Home";
import Signin from "./routes/Signin";
import Leave from "./routes/Leave";
import BookDetail from "./routes/BookDetail";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";
import api from "./api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { setIsAuthenticated } from "./store/authSlice";
import { useSignOut } from "./hooks/useSignout";

function App() {
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { Signout } = useSignOut();

  useEffect(() => {
    // 토큰 검증
    if (token) {
      api
        .get("/api/verify-token", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(setIsAuthenticated(res.data.valid));
          if (!res.data.valid) Signout();
        })
        .catch((error) => {
          console.log("Token verification error:", error);
        });
    }
  }, [Signout, dispatch, token]);

  return (
    <>
      <Routes>
        <Route path="" element={<Root />}>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/book/detail/:id" element={<BookDetail />} />
          <Route path="/my" element={<PrivateRoute component={<My />} isAuthenticated={isAuthenticated} />} />
          <Route path="/review/detail/:id" element={<PrivateRoute component={<ReviewDetail />} isAuthenticated={isAuthenticated} />} />
          <Route path="/my_list" element={<MyBookList isAuthenticated={isAuthenticated} />} />
          <Route path="/search/:filter" element={<SearchResult />} />
          <Route path="/leave" element={<PrivateRoute component={<Leave />} isAuthenticated={isAuthenticated} />} />
        </Route>
        <Route path="/write" element={<PrivateRoute component={<Write />} isAuthenticated={isAuthenticated} />} />
        <Route path="/find_password" element={isAuthenticated ? <Navigate replace to="/" /> : <FindPassword />} />
        <Route path="/find_password/next" element={isAuthenticated ? <Navigate replace to="/" /> : <FindPassword />} />
        <Route path="/signin" element={isAuthenticated ? <Navigate replace to="/" /> : <Signin />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate replace to="/" /> : <Signup />} />
        <Route path="/signup/next" element={isAuthenticated ? <Navigate replace to="/" /> : <Signup />} />
      </Routes>
    </>
  );
}

export default App;
