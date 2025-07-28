import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProblemById } from "../../utils/problemUtils";
import { submitCode } from "../../utils/submissionUtils";
import { judgeSubmission } from "../../utils/judgeUtils";
import Verdict from "./Verdict";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "../../styles/Solve.css";

const availableLanguages = ["cpp", "python", "java"];

const Solve = () => {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState(null);
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { loggedIn } = useSelector((state) => state.auth);
  const [submissionId, setSubmissionId] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(
    availableLanguages[0]
  );

  const handleSubmit = async () => {
    setSubmissionId(null);
    setSubmitting(true);
    try {
      const submission = await submitCode(problemId, code, selectedLanguage);
      const judgeSubmitted = await judgeSubmission(submission._id);
      if (judgeSubmitted) setSubmissionId(submission._id);
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const fetchedProblem = await getProblemById(problemId);
        setProblem(fetchedProblem);
        setError(null);
      } catch (error) {
        console.error("Error fetching problem:", error);
        setError("Failed to load problem details. Please try again later.");
      }
    };

    fetchProblem();
  }, [problemId]);

  if (error) {
    return (
      <div className="solve-error-container">
        <div className="solve-error-box">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="solve-loading-container">
        <p>Loading problem...</p>
      </div>
    );
  }

  return (
    <div className="solve-container">
      <div className="solve-problem-section">
        <h2 className="solve-problem-title">{problem.name}</h2>
        <div className="solve-difficulty-badge">{problem.difficulty}</div>
        <p className="solve-problem-description">{problem.description}</p>
      </div>

      <div className="solve-code-section">
        <div className="solve-code-header">
          <h3 className="solve-code-title">Code</h3>
          <div className="solve-language-select-wrapper">
            <select
              className="solve-language-select"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Editor
          value={code}
          onValueChange={setCode}
          padding={15}
          highlight={(code) => highlight(code, languages.js)}
          className="solve-code-editor"
          disabled={!loggedIn}
        />
        {!loggedIn && (
          <p className="solve-login-message">
            You need to{" "}
            <a href="/auth" target="_blank" rel="noopener noreferrer">
              log in
            </a>{" "}
            to submit.
          </p>
        )}

        {submissionId && (
          <div className="solve-verdict-wrapper">
            <Verdict submissionId={submissionId} />
          </div>
        )}

        <button
          className="solve-submit-button"
          disabled={!loggedIn || submitting}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Solve;
