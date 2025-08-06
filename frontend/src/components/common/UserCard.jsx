import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteUser } from "../../utils/userUtils";
import "../../styles/UserCard.css";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);

  const handleDelete = async () => {
    try {
      await deleteUser(user._id);
    } catch (err) {
      console.log(err);
    } finally {
      window.location.reload();
    }
  };

  return (
    <div
      className="user-card"
      onClick={() => navigate(`/users/${user._id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="user-card-header">
        <div className="user-info">
          <h2 className="user-card-name">{user.username}</h2>
          <span className="user-fullname">{user.fullName || ""}</span>
        </div>

        <span className="user-email">{user.email}</span>
        {currentUser?.admin && (
          <button
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
