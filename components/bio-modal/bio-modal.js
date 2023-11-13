import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSession } from "next-auth/react";
import useSWR, { useSWRConfig } from 'swr';


const BioModal = ({ tweetId, onClose }) => {
  const [bio, setBio] = useState("");
  const [charCount, setCharCount] = useState(0);
  const { data: session } = useSession();
  const { mutate } = useSWRConfig()
  
  const userId = session?.user?.userId
  const userName = session?.user?.name
 

  const handleBioChange = (e) => {
    // setBio(e.target.value);
    const inputValue = e.target.value;
    setBio(inputValue);
    setCharCount(inputValue.length); 

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/bio', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio, userName, userId }),
      });
      mutate("/api/users")

      if (response.ok) {
        const data = await response.json();
        onClose();
      } else {

        console.error("Error submitting bio");
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
              <div>
                <span className="current1">{charCount}</span>
                <span className="maximum">/160</span>
              </div>
              <label>
                <textarea className="modal--textarea" maxLength={160} placeholder="say a little about yourself..." rows={8} cols={60} value={bio} onChange={handleBioChange} />
              </label>
              <button type="submit">Submit Bio</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById("modal-root"));
};

export default BioModal;

