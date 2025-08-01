import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubmissions } from "../../utils/submissionUtils";
import "../../styles/Submissions.css";
import Editor from "./Editor";

const Submissions = () => {
  const { problemId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const submissions = await getSubmissions(problemId);
        setSubmissions(submissions);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSubmissions();
  }, [problemId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

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
                  <h2 className="submission-status">{submission.status}</h2>
                  <p className="submission-date">
                    {formatDate(submission.created)}
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
