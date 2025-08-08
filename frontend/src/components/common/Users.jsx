import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUsers } from "../../utils/userUtils";
import UserCard from "./UserCard";
import "../../styles/Users.css";

const Users = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const allUsers = await getUsers();
      setUsers(allUsers);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-box">
          <h2 className="loading-title">Loading users...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-box">
          <h2 className="error-title">Error: {error}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="users-page">
      <div className="users-container">
        <h1 className="users-title">User List</h1>

        <div className="users-list">
          {users.length === 0 ? (
            <p className="no-users">No users available.</p>
          ) : (
            users.map((user) => <UserCard key={user._id} user={user} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
