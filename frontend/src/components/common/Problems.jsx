import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProblems } from "../../utils/problemUtils";
import ProblemCard from "./ProblemCard";
import "../../styles/Problems.css";

const Problems = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);

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

  const handleDifficultyToggle = (difficulty) => {
    setSelectedDifficulties((prev) => {
      if (prev.includes(difficulty)) {
        return prev.filter((item) => item !== difficulty);
      } else {
        return [...prev, difficulty];
      }
    });
  };

  const filteredProblems = problems.filter((problem) => {
    const nameMatch = problem.name.toLowerCase().includes(searchQuery.toLowerCase());
    const difficultyMatch =
      selectedDifficulties.length === 0 || selectedDifficulties.includes(problem.difficulty);
    return nameMatch && difficultyMatch;
  });

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

        <div className="search-bar-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search problems by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="difficulty-filter">
            {["Easy", "Medium", "Hard"].map((difficulty) => (
              <button
                key={difficulty}
                className={`difficulty-button ${selectedDifficulties.includes(difficulty) ? "selected" : ""}`}
                onClick={() => handleDifficultyToggle(difficulty)}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        <div className="problems-list">
          {filteredProblems.length === 0 ? (
            <p className="no-problems">No problems available matching the search.</p>
          ) : (
            filteredProblems.map((problem) => (
              <ProblemCard key={problem._id} problem={problem} />
            ))
          )}
        </div>

        {user?.admin && (
          <button
            className="add-button"
            onClick={() => navigate("/problems/add")}
          >
            Add Problem
          </button>
        )}
      </div>
    </div>
  );
};

export default Problems;
