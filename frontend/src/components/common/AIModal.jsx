import { useState } from "react";
import { useEffect } from "react";
import { getReview } from "../../utils/aiUtils";
import "../../styles/AIModal.css";

const AIModal = ({ content, onClose }) => {
  const [review, setReview] = useState();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const result = await getReview(content.description, content.code);
        setReview(result);
      } catch (err) {
        setReview(err.message);
      }
    };

    fetchReview();
  }, [content]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>Review</h2>
          <button className="close-btn" onClick={onClose}>
            <span>&#x2715;</span>
          </button>
        </header>

        <div className="modal-body">
          <div className="review-text">
            <pre>{review}</pre>
          </div>
        </div>

        <footer className="modal-footer">
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AIModal;
