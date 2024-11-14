import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSession } from "next-auth/react";
import useSWR, { useSWRConfig } from 'swr';


const CommentModal = ({ tweet, tweetId, commentId, onClose }) => {
  const [comment, setComment] = useState("");
  const { data: session } = useSession();
  const { mutate } = useSWRConfig()


  const userName = session?.user?.name
  const userId = session?.user?.userId

  const handleCommentChange = (e) => {
    setComment(e.target.value);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {


      const url = commentId ? `/api/comments/${commentId}` : '/api/comments';
      const body = { comment, tweetId, userName, userId };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      mutate("/api/users")
      mutate(`/api/tweets/${tweetId}`)
      mutate(`/api/users/${userId}`)

      if (commentId) {
        mutate(`/api/comments/${commentId}`);
      }

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
                <textarea className="modal--textarea" placeholder="say what you feel..." rows={8} cols={60} value={comment} onChange={handleCommentChange} />
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

