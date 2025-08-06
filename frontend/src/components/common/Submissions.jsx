import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "./Editor";
import { getSubmissions } from "../../utils/submissionUtils";
import "../../styles/Submissions.css";

const Submissions = () => {
  const { problemId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const submissions = await getSubmissions(problemId);
        setSubmissions(submissions);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [problemId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  if (loading) {
    return (
      <div className="submisions-loading-container">
        <div className="submissions-loading-box">
          <h2 className="submissions-loading-title">Loading submissions...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="submissions-page">
      <div className="submissions-container">
        <div className="submissions-left-container">
          <div className="submissions-list">
            {submissions.length === 0 ? (
              <p className="no-submissions">No submissions.</p>
            ) : (
              submissions.map((submission) => (
                <div
                  className="submission-card"
                  key={submission._id}
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <div>
                    <h2 className="submission-status">{submission.status}</h2>
                    <p className="submission-date">
                      {formatDate(submission.created)}
                    </p>
                  </div>
                  <p className="submission-language">
                    <span>{submission.language}</span>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="submissions-right-container">
          {selectedSubmission && (
            <div className="submissions-result">
              {selectedSubmission.error && (
                <div className="submissions-error-box">
                  {selectedSubmission.error}
                </div>
              )}
              {!selectedSubmission.error && (
                <p className="submissions-result-count">
                  {selectedSubmission.passedTests.length}/
                  {selectedSubmission.passedTests.length +
                    selectedSubmission.failedTests.length}{" "}
                  Test Cases Passed
                </p>
              )}
              <Editor
                code={selectedSubmission.code}
                language={selectedSubmission.language}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Submissions;
