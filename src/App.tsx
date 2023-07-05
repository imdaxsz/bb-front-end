import Home from "./components/Home";
import TopBar from "./components/TopBar";
import { Routes, Route } from "react-router-dom";
import Find from "./components/Find";
import Reset from "./components/Reset";
import LogIn from "./routes/LogIn";
import Join from "./routes/Join";
import ReviewDetail from "./routes/ReviewDetail";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TopBar />
              <Home />
            </>
          }
        />
        
        <Route path="/login" element={<LogIn />} />
        <Route path="/find_id" element={<Find />} />
        <Route path="/find_password" element={<Find />} />
        <Route path="/reset_password" element={<Reset />} />
        <Route path="/join" element={<Join />} />
        <Route path="/review/detail/:id" element={<><TopBar/><ReviewDetail/></>} />
      </Routes>
    </div>
  );
}

export default App;
