import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addProblem,
  getProblemById,
  updateProblem,
} from "../../utils/problemUtils";
import { addTestCases, getTestCases } from "../../utils/testCasesUtils";
import "../../styles/Problem.css";

const Problem = () => {
  const navigate = useNavigate();

  const { problemId } = useParams();

  const [problemName, setProblemName] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [linesPerCase, setLinesPerCase] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!problemName || !problemDescription) {
      setError("Problem name and description are mandatory.");
      return;
    }
    try {
      let problem;
      if (problemId) {
        problem = await updateProblem(
          problemId,
          problemName,
          problemDescription,
          difficulty
        );
      } else {
        problem = await addProblem(problemName, problemDescription, difficulty);
      }

      await addTestCases(problem._id, input, output, linesPerCase);

      navigate(`/solve/${problem._id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const getProblemDetails = async () => {
      try {
        const problem = await getProblemById(problemId);
        if (problem) {
          setProblemName(problem.name);
          setProblemDescription(problem.description);
          setDifficulty(problem.difficulty);
        }
        const testCase = await getTestCases(problemId);
        if (testCase) {
          setInput(testCase.input);
          setOutput(testCase.output);
          setLinesPerCase(testCase.linesPerCase);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (problemId) getProblemDetails();
  }, [problemId]);

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
