import { Routes, Route } from "react-router-dom";
import Find from "./components/Find";
import Reset from "./components/Reset";
import LogIn from "./routes/LogIn";
import Signup from "./routes/Signup";
import ReviewDetail from "./routes/ReviewDetail";
import My from "./routes/My";
import Root from "./components/Root";
import Recommend from "./routes/Recommend";
import MyList from "./routes/MyList";
import Write from "./routes/Write";
import SearchResult from "./routes/SearchResult";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/my" element={<My />} />
          <Route path="/review/detail/:id" element={<ReviewDetail />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/search/:filter" element={<SearchResult/> } />
        </Route>
        <Route path="/write" element={<Write />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/find_id" element={<Find />} />
        <Route path="/find_password" element={<Find />} />
        <Route path="/reset_password" element={<Reset />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
