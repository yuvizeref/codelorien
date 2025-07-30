import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProblems } from "../../utils/problemUtils";
import "../../styles/Problems.css";
import ProblemCard from "./ProblemCard";

const Problems = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const allProblems = await getProblems();
      setProblems(allProblems);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-box">
          <h2 className="loading-title">Loading problems...</h2>
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
    <div className="problems-page">
      <div className="problems-container">
        <h1 className="problems-title">Problem List</h1>

        <div className="problems-list">
          {problems.length === 0 ? (
            <p className="no-problems">No problems available.</p>
          ) : (
            problems.map((problem) => (
              <ProblemCard key={problem._id} problem={problem} />
            ))
          )}
        </div>
        <button
          className="add-button"
          onClick={() => navigate("/problems/add")}
        >
          Add Problem
        </button>
      </div>
    </div>
  );
};

export default Problems;
