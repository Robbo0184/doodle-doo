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
  const { data: user, isLoading, error } = useSWR(userId ? `/api/users/${userId}` : null);

  const userName = session?.user?.name


  const handleBioChange = (e) => {

    const inputValue = e.target.value;
    const capitalizedBio = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

    setBio(capitalizedBio);
    setCharCount(capitalizedBio.length);

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
      mutate(`/api/users/${userId}`)

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
        <div className="bio--modal">
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
                <textarea className="modal--textarea" maxLength={160} placeholder={user?.bio?.length > 0 ? user.bio : "Say a little something about yourself..."}
                  rows={8} cols={60} value={bio} onChange={handleBioChange} />
              </label>
              <button type="submit">{user?.bio?.length > 0 ? "Edit Bio" : "Add Bio"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );


  return ReactDOM.createPortal(modalContent, document.getElementById("modal-root"));
};

export default BioModal;

