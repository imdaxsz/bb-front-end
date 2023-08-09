import { Routes, Route } from "react-router-dom";
import Find from "./components/Find";
import Reset from "./components/Reset";
import Signup from "./routes/Signup";
import ReviewDetail from "./routes/ReviewDetail";
import My from "./routes/My";
import Root from "./components/Root";
import Recommend from "./routes/Recommend";
import MyList from "./routes/MyList";
import Write from "./routes/Write";
import SearchResult from "./routes/SearchResult";
import Home from "./components/Home";
import Signin from "./routes/Signin";
import Leave from "./routes/Leave";
import BookDetail from "./routes/BookDetail";
import PrivateRoute from "./components/PrivateRoute";
import { useState, useEffect } from "react";
import api from "./api/api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 토큰 검증
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/api/verify-token", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.valid) setIsAuthenticated(true);
          else setIsAuthenticated(false);
        })
        .catch((error) => {
          console.error("Token verification error:", error);
        });
    }
  }, []);

  return (
    <Routes>
      <Route path="" element={<Root />}>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/book/detail/:id" element={<BookDetail />} />
        <Route path="/my" element={<PrivateRoute component={<My />} isAuthenticated={isAuthenticated} />} />
        <Route path="/review/detail/:id" element={<PrivateRoute component={<ReviewDetail />} isAuthenticated={isAuthenticated} />} />
        <Route path="/my-list" element={<MyList isAuthenticated={isAuthenticated} />} />
        <Route path="/search/:filter" element={<SearchResult />} />
        <Route path="/leave" element={<PrivateRoute component={<Leave />} isAuthenticated={isAuthenticated} />} />
      </Route>
      <Route path="/write" element={<PrivateRoute component={<Write />} isAuthenticated={isAuthenticated} />} />
      <Route path="/find_password" element={<Find />} />
      <Route path="/reset_password" element={<Reset />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
