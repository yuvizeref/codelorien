import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../utils/authUtils";
import { FiUser } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserClick = () => {
    if (user && user._id) {
      navigate(`/users/${user._id}`);
      setDropdownOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            Codelorien
          </Link>

          <ul className="navbar-links">
            <li>
              <a href="/problems">Problems</a>
            </li>
            {user?.admin && (
              <li>
                <a href="/users">Users</a>
              </li>
            )}
          </ul>
        </div>

        <div className="navbar-right">
          {user ? (
            <div
              className="user-icon-container"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              ref={dropdownRef}
            >
              <FiUser className="user-icon" />

              {dropdownOpen && (
                <div className="dropdown-menu">
                  {user.username && (
                    <button className="dropdown-item" onClick={handleUserClick}>
                      {user.username}
                    </button>
                  )}
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      logout(dispatch);
                      window.location.reload();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/auth" className="auth-link">
                Login or Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
