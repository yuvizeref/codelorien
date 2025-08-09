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
import Problem from "./components/common/Problem";
import Submissions from "./components/common/Submissions";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/common/User";
import Users from "./components/common/Users";
import "./App.css";
import Footer from "./components/common/Footer";

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
      <Router>
        <Navbar></Navbar>
        <div className="app">
          <Routes>
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route path="/problems" element={<Problems />} />
            <Route
              path="/problems/add"
              element={<ProtectedRoute element={<Problem />} />}
            />
            <Route
              path="/problems/edit/:problemId"
              element={<ProtectedRoute element={<Problem />} />}
            />
            <Route path="/solve/:problemId" element={<Solve />} />
            <Route path="/submissions/:problemId" element={<Submissions />} />
            <Route
              path="/auth"
              element={loggedIn ? <Navigate to="/problems" /> : <Auth />}
            />
            <Route path="/users/:userId" element={<User />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
        <Footer></Footer>
      </Router>
    </>
  );
};

export default App;
