import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProblemById } from "../../utils/problemUtils";
import { submitCode } from "../../utils/submissionUtils";
import { judgeSubmission } from "../../utils/judgeUtils";
import Verdict from "./Verdict";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import { runCode } from "../../utils/runUtils";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "../../styles/Solve.css";

const availableLanguages = ["cpp"];

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
  const [activeTab, setActiveTab] = useState("custom-input");
  const [customInput, setCustomInput] = useState("");
  const [result, setResult] = useState("");

  const handleRun = async () => {
    setSubmitting(true);
    try {
      const result = await runCode(code, customInput, selectedLanguage);
      setResult(result);
    } catch (err) {
      setResult(err.message);
    } finally {
      setSubmitting(false);
      setActiveTab("result");
    }
  };

  const handleSubmit = async () => {
    setSubmissionId(null);
    setSubmitting(true);
    try {
      const submission = await submitCode(problemId, code, selectedLanguage);
      const judgeSubmitted = await judgeSubmission(submission._id);
      if (judgeSubmitted) {
        setSubmissionId(submission._id);
        setActiveTab("verdict");
      }
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "custom-input":
        return (
          <textarea
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Enter custom input here"
          />
        );
      case "result":
        return <div className="solve-result-div">{result}</div>;
      case "verdict":
        return submissionId ? (
          <Verdict submissionId={submissionId} />
        ) : (
          <p>You must submit first.</p>
        );
      default:
        return null;
    }
  };

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

        <div className="solve-tabs">
          <div
            className={`solve-tab ${
              activeTab === "custom-input" ? "active" : ""
            }`}
            onClick={() => handleTabClick("custom-input")}
          >
            Custom Input
          </div>
          <div
            className={`solve-tab ${activeTab === "result" ? "active" : ""}`}
            onClick={() => handleTabClick("result")}
          >
            Result
          </div>
          <div
            className={`solve-tab ${activeTab === "verdict" ? "active" : ""}`}
            onClick={() => handleTabClick("verdict")}
          >
            Verdict
          </div>
        </div>

        <div className="solve-tab-content">{renderTabContent()}</div>

        <div className="solve-button-container">
          <button
            className="solve-submit-button"
            disabled={!loggedIn || submitting}
            onClick={handleRun}
          >
            Run
          </button>

          <button
            className="solve-submit-button"
            disabled={!loggedIn || submitting}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Solve;
