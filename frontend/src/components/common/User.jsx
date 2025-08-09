import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser, updateUser, updatePassword } from "../../utils/userUtils";
import "../../styles/User.css";

const User = () => {
  const { userId } = useParams();
  const user = useSelector((state) => state.auth.user);

  const id = user?._id || JSON.parse(localStorage.getItem("user"))?.id;
  const isEditingSelf = id === userId;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [inputErrors, setInputErrors] = useState({
    username: false,
    email: false,
    passwordMismatch: false,
    passwordIncomplete: false,
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await getUser(userId);
        setUsername(user.username);
        setEmail(user.email);
        setFullName(user.fullName || "");
      } catch (err) {
        setErrorMessage(err.response?.data?.error || "Failed to fetch user.");
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleInputChange = (field, setField) => (event) => {
    setField(event.target.value);
    setInputErrors((prev) => ({
      ...prev,
      [field]: false,
      passwordMismatch: false,
      passwordIncomplete: false,
    }));
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const updateUserDetail = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    setInputErrors({
      username: false,
      email: false,
      passwordMismatch: false,
      passwordIncomplete: false,
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

    const isTryingToChangePassword = password || oldPassword || confirmPassword;

    if (isEditingSelf) {
      if (isTryingToChangePassword) {
        if (!oldPassword || !password || !confirmPassword) {
          setInputErrors((prev) => ({
            ...prev,
            passwordIncomplete: true,
          }));
          hasErrors = true;
        } else if (password !== confirmPassword) {
          setInputErrors((prev) => ({
            ...prev,
            passwordMismatch: true,
          }));
          hasErrors = true;
        }
      }
    } else {
      if (password && password.length < 6) {
        setInputErrors((prev) => ({
          ...prev,
          passwordIncomplete: true,
        }));
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setLoading(false);
      return;
    }

    try {
      await updateUser(userId, username, email, fullName, password);

      if (isEditingSelf && isTryingToChangePassword) {
        await updatePassword(userId, oldPassword, password);
      }

      setSuccessMessage("User updated successfully.");
      setOldPassword("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-user-container">
      <div className="edit-user-form">
        <h2 className="edit-user-title">Edit User Details</h2>

        <form onSubmit={updateUserDetail}>
          <div className="mb-4">
            <label htmlFor="username" className="input-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              onChange={handleInputChange("username", setUsername)}
              value={username}
              className={`input-field ${
                inputErrors.username ? "input-error" : ""
              }`}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              onChange={handleInputChange("email", setEmail)}
              value={email}
              className={`input-field ${
                inputErrors.email ? "input-error" : ""
              }`}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fullName" className="input-label">
              Full Name (Optional)
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter full name"
              onChange={handleInputChange("fullName", setFullName)}
              value={fullName}
              className="input-field"
            />
          </div>

          {isEditingSelf ? (
            <>
              <div className="mb-4">
                <label htmlFor="oldPassword" className="input-label">
                  Old Password
                </label>
                <input
                  id="oldPassword"
                  type="password"
                  placeholder="Enter current password"
                  onChange={handleInputChange("oldPassword", setOldPassword)}
                  value={oldPassword}
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="input-label">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  onChange={handleInputChange("password", setPassword)}
                  value={password}
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="input-label">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  onChange={handleInputChange(
                    "confirmPassword",
                    setConfirmPassword
                  )}
                  value={confirmPassword}
                  className={`input-field ${
                    inputErrors.passwordMismatch ||
                    inputErrors.passwordIncomplete
                      ? "input-error"
                      : ""
                  }`}
                />
              </div>
            </>
          ) : (
            <div className="mb-4">
              <label htmlFor="password" className="input-label">
                New Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter new password"
                onChange={handleInputChange("password", setPassword)}
                value={password}
                className={`input-field ${
                  inputErrors.passwordIncomplete ? "input-error" : ""
                }`}
              />
            </div>
          )}

          {inputErrors.passwordMismatch && (
            <p className="error-message">New passwords do not match.</p>
          )}

          {inputErrors.passwordIncomplete && (
            <p className="error-message">
              Please fill out all required password fields.
            </p>
          )}

          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}

          {successMessage && (
            <div className="success-message">
              <p>{successMessage}</p>
            </div>
          )}

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Updating..." : "Update Details"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default User;
