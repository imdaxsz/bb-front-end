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

function App() {
  return (
    <div>
      <Routes>
        <Route path="" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/my" element={<My />} />
          <Route path="/review/detail/:id" element={<ReviewDetail />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/search/:filter" element={<SearchResult />} />
          <Route path="/leave" element={<Leave />} />
        </Route>
        <Route path="/write" element={<Write />} />
        <Route path="/find_id" element={<Find />} />
        <Route path="/find_password" element={<Find />} />
        <Route path="/reset_password" element={<Reset />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
