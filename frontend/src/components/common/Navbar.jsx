import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../utils/authUtils";
import { FiUser } from "react-icons/fi";
import "../../styles/Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-logo">Codelorien</div>

          <ul className="navbar-links">
            <li>
              <a href="/problems">Problems</a>
            </li>
          </ul>
        </div>

        <div
          className="user-icon-container"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          ref={dropdownRef}
        >
          <FiUser className="user-icon" />

          {dropdownOpen && (
            <div className="dropdown-menu">
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
      </div>
    </nav>
  );
};

export default Navbar;
