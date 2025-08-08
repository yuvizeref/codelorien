import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "../../utils/userUtils";
import "../../styles/User.css";

const User = () => {
  const { userId } = useParams();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    username: false,
    email: false,
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await getUser(userId);
        setUsername(user.username);
        setEmail(user.email);
        setFullName(user.fullName || "");
      } catch (err) {
        setErrorMessage(err.response.data.error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleInputChange = (field, setField) => (event) => {
    setField(event.target.value);

    if (event.target.value) {
      setInputErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const updateUserDetail = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage(null);

    setInputErrors({
      username: false,
      email: false,
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

    if (hasErrors) {
      setLoading(false);
      return;
    }

    try {
      await updateUser(userId, username, email, fullName);
    } catch (err) {
      setErrorMessage(err.response.data.error);
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
          <label htmlFor="username" className="input-label">Username</label>
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
          <label htmlFor="email" className="input-label">Email</label>
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
          <label htmlFor="fullName" className="input-label">Full Name (Optional)</label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter full name"
            onChange={handleInputChange("fullName", setFullName)}
            value={fullName}
            className="input-field"
          />
        </div>

        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
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
