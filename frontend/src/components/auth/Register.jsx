import { useState } from "react";
import { registerUser } from "../../utils/userUtils";
import "../../styles/Register.css";

const Register = ({ setLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const register = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage(null);

    setInputErrors({
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
    });

    let hasErrors = false;

    if (!username) {
      setInputErrors((prev) => ({ ...prev, username: true }));
      hasErrors = true;
    }
    if (!email) {
      setInputErrors((prev) => ({ ...prev, email: true }));
      hasErrors = true;
    }
    if (!password) {
      setInputErrors((prev) => ({ ...prev, password: true }));
      hasErrors = true;
    }
    if (!confirmPassword) {
      setInputErrors((prev) => ({ ...prev, confirmPassword: true }));
      hasErrors = true;
    }

    if (hasErrors) {
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setLoading(false);
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address!");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters!");
      setLoading(false);
      return;
    }

    try {
      await registerUser(username, email, fullName, password);
      setLogin(true);
    } catch (err) {
      setErrorMessage("Could not register user. Please try again.");
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
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title">Create Your Account</h2>

        <form onSubmit={register}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              onChange={handleInputChange("username", setUsername)}
              value={username}
              className={`input-field ${
                inputErrors.username ? "input-error" : ""
              }`}
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              onChange={handleInputChange("email", setEmail)}
              value={email}
              className={`input-field ${
                inputErrors.email ? "input-error" : ""
              }`}
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name (Optional)"
              onChange={handleInputChange("fullName", setFullName)}
              value={fullName}
              className="input-field"
            />
          </div>

          <div className="mb-4">
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

          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={handleInputChange(
                "confirmPassword",
                setConfirmPassword
              )}
              value={confirmPassword}
              className={`input-field ${
                inputErrors.confirmPassword ? "input-error" : ""
              }`}
            />
          </div>

          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="login-link">
          <p>
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setLogin(true)}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
