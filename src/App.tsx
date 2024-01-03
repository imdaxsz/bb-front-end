import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import api from "./api";
import PrivateRoute from "./components/PrivateRoute";
import Root from "./components/Root";
import useSignOut from "./hooks/useSignout";
import BookDetail from "./routes/BookDetail";
import FindPassword from "./routes/FindPassword";
import GoogleCallback from "./routes/GoogleCallback";
import GoogleRedirect from "./routes/GoogleRedirect";
import Home from "./routes/Home";
import Leave from "./routes/Leave";
import My from "./routes/My";
import MyBookList from "./routes/MyBookList";
import NotFound from "./routes/NotFound";
import Recommend from "./routes/Recommend";
import ReviewDetail from "./routes/ReviewDetail";
import SearchResult from "./routes/SearchResult";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";
import Write from "./routes/Write";
import { setIsAuthenticated } from "./store/authSlice";
import { RootState } from "./store/store";

function App() {
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const dispatch = useDispatch();
  const { signOut } = useSignOut();

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
          if (!res.data.valid) signOut("/");
        })
        .catch((error) => {
          console.log("Token verification error:", error);
          signOut("/");
        });
    }
  }, [signOut, dispatch, token]);

  return (
    <>
      <Routes>
        <Route path="" element={<Root />}>
          <Route
            path="/"
            element={<Home isAuthenticated={isAuthenticated} />}
          />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/book/detail/:id" element={<BookDetail />} />
          <Route
            path="/my"
            element={
              <PrivateRoute
                component={<My />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/review/detail/:id"
            element={
              <PrivateRoute
                component={<ReviewDetail />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/my_list"
            element={<MyBookList isAuthenticated={isAuthenticated} />}
          />
          <Route path="/search/:filter" element={<SearchResult />} />
          <Route
            path="/leave"
            element={
              <PrivateRoute
                component={<Leave />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
        </Route>
        <Route
          path="/write"
          element={
            <PrivateRoute
              component={<Write />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/find_password"
          element={
            isAuthenticated ? <Navigate replace to="/" /> : <FindPassword />
          }
        />
        <Route
          path="/find_password/next"
          element={
            isAuthenticated ? <Navigate replace to="/" /> : <FindPassword />
          }
        />
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate replace to="/" /> : <Signin />}
        />
        <Route
          path="/auth/google/callback"
          element={
            isAuthenticated ? <Navigate replace to="/" /> : <GoogleCallback />
          }
        />
        <Route
          path="/auth/google"
          element={
            isAuthenticated ? <Navigate replace to="/" /> : <GoogleRedirect />
          }
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate replace to="/" /> : <Signup />}
        />
        <Route
          path="/signup/next"
          element={isAuthenticated ? <Navigate replace to="/" /> : <Signup />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
