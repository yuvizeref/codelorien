import { useNavigate } from "react-router-dom";
import "../../styles/ProblemCard.css";
import { deleteProblemById } from "../../utils/problemUtils";

const ProblemCard = ({ problem }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteProblemById(problem._id);
    } catch (err) {
      console.log(err);
    } finally {
      window.location.reload();
    }
  };

  return (
    <div
      className="problem-card"
      onClick={() => navigate(`/solve/${problem._id}`)}
      style={{ cursor: "pointer" }}
    >
      <h2 className="problem-card-name">{problem.name}</h2>
      <div className="problem-meta">
        <span className="difficulty-tag">{problem.difficulty}</span>
      </div>

      <div className="problem-card-buttons">
        <button
          className="edit-button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`edit/${problem._id}`);
          }}
        >
          Edit
        </button>
        <button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProblemCard;
