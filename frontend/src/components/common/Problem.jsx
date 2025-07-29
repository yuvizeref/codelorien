import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProblem } from "../../utils/problemUtils";
import { addTestCases } from "../../utils/testCasesUtils";
import "../../styles/Problem.css";

const Problem = ({
  prevName,
  prevDescription,
  prevInput,
  prevOutput,
  prevLinesPerCase,
  prevDifficulty,
}) => {
  const navigate = useNavigate();

  const [problemName, setProblemName] = useState(prevName);
  const [problemDescription, setProblemDescription] = useState(prevDescription);
  const [input, setInput] = useState(prevInput);
  const [output, setOutput] = useState(prevOutput);
  const [difficulty, setDifficulty] = useState(prevDifficulty ?? "Easy");
  const [linesPerCase, setLinesPerCase] = useState(prevLinesPerCase ?? 0);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!problemName || !problemDescription) {
      setError("Problem name and description are mandatory.");
      return;
    }
    try {
      const problem = await addProblem(
        problemName,
        problemDescription,
        difficulty
      );

      await addTestCases(problem._id, input, output, linesPerCase);

      navigate(`/solve/${problem._id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="problem-editor-container">
      <div className="problem-left-section">
        <div className="form-group">
          <label>Name</label>
          <textarea
            value={problemName}
            onChange={(e) => setProblemName(e.target.value)}
            placeholder="Enter problem name"
            className="problem-name-input"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            placeholder="Enter problem description"
            className="problem-description-input"
          />
        </div>
      </div>

      <div className="problem-right-section">
        <div className="difficulty-badge">
          <label>Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="difficulty-select"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="input-output-section">
          <div className="form-group">
            <label>Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input"
              className="input-textarea"
            />
          </div>
          <div className="form-group">
            <label>Output</label>
            <textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              placeholder="Enter output"
              className="output-textarea"
            />
          </div>
          <div className="form-group">
            <label>Output Lines per test case</label>
            <input
              type="number"
              className="lines-input"
              value={linesPerCase}
              onChange={(e) => setLinesPerCase(e.target.value)}
            />
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Problem;
