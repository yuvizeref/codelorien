import { useState, useEffect } from "react";
import { getSubmission } from "../../utils/submissionUtils";
import "../../styles/Verdict.css";

const Verdict = ({ submissionId }) => {
  const [verdict, setVerdict] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [polling, setPolling] = useState(true);

  useEffect(() => {
    if (polling) {
      const interval = setInterval(async () => {
        try {
          const submission = await getSubmission(submissionId);
          setVerdict(submission);
          if (submission.evaluated) {
            setPolling(false);
          }
          setLoading(false);
        } catch (err) {
          console.log(err);
          setError("Failed to fetch submission details.");
          setLoading(false);
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [polling, submissionId]);

  const renderVerdict = () => {
    if (!verdict) return null;
    const accepted = verdict.status === "accepted";
    return (
      <div className={accepted ? "verdict-box accepted" : "verdict-box failed"}>
        <h3>{accepted ? "Accepted" : "Failed"}</h3>
        {verdict.error && <div className="error-box">{verdict.error}</div>}
        {!verdict.error && (
          <p>
            {verdict.passedTests.length}/
            {verdict.passedTests.length + verdict.failedTests.length} Test Cases
            Passed
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="verdict-container">
      {loading ? (
        <p>Loading verdict...</p>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        renderVerdict()
      )}
    </div>
  );
};

export default Verdict;
