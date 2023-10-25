import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSession } from "next-auth/react";

const CommentModal = ({ tweetId, onClose }) => {
  const [comment, setComment] = useState("");
  const { data: session } = useSession();

  const userName = session?.user?.name

  const handleCommentChange = (e) => {
    setComment(e.target.value);

  };
  console.log("tweetsId", tweetId)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/comments', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, tweetId, userName }),
      });

      if (response.ok) {
        const data = await response.json();
        onClose();
      } else {

        console.error("Error submitting comment");
      }
    } catch (error) {

      console.error("Error:", error);
    }
    onClose();
  };

  const modalContent = (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <a href='#' onClick={onClose}>
              x
            </a>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <label>
                <textarea placeholder="say what you feel..." rows={8} cols={60} value={comment} onChange={handleCommentChange} />
              </label>
              <button type="submit">Add Comment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById("modal-root"));
};

export default CommentModal;

