import { useState } from "react";
import { login } from "../../utils/authUtils";
import { useDispatch } from "react-redux";
import "../../styles/Login.css";

const Login = ({ setLogin }) => {
  const dispatch = useDispatch();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    usernameOrEmail: false,
    password: false,
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage(null);

    setInputErrors({
      usernameOrEmail: false,
      password: false,
    });

    let hasErrors = false;

    if (!usernameOrEmail) {
      setInputErrors((prev) => ({ ...prev, usernameOrEmail: true }));
      hasErrors = true;
    }
    if (!password) {
      setInputErrors((prev) => ({ ...prev, password: true }));
      hasErrors = true;
    }

    if (hasErrors) {
      setLoading(false);
      return;
    }

    try {
      await login(usernameOrEmail, password, dispatch);
    } catch (err) {
      setErrorMessage("Login failed. Please check your credentials.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, setField) => (event) => {
    setField(event.target.value);

    if (event.target.value) {
      setInputErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login to Your Account</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username or Email"
              onChange={handleInputChange(
                "usernameOrEmail",
                setUsernameOrEmail
              )}
              value={usernameOrEmail}
              className={`input-field ${
                inputErrors.usernameOrEmail ? "input-error" : ""
              }`}
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              onChange={handleInputChange("password", setPassword)}
              value={password}
              className={`input-field ${
                inputErrors.password ? "input-error" : ""
              }`}
            />
          </div>

          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="register-link">
          <p>
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setLogin(false)}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
