import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
  const user = useSelector((state) => state.auth.user);
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  if (!loggedIn || !user?.admin) {
    return <Navigate to="/auth" replace />;
  }

  return element;
};

export default ProtectedRoute;
