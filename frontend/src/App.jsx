import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setSession } from "./redux/actions/authActions";
import Auth from "./components/auth/Auth";
import Problems from "./components/common/Problems";
import Solve from "./components/common/Solve";
import Navbar from "./components/common/Navbar";
import "./App.css";
import Problem from "./components/common/Problem";

const App = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      dispatch(setSession(token, user));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar></Navbar>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Navigate to="/problems" />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problems/add" element={<Problem />} />
            <Route path="/problems/edit/:problemId" element={<Problem />} />
            <Route path="/solve/:problemId" element={<Solve />} />
            <Route
              path="/auth"
              element={loggedIn ? <Navigate to="/problems" /> : <Auth />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
