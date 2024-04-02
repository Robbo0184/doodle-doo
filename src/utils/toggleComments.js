
export function toggleComments(tweetId, setVisibleComments){
    setVisibleComments((prevComments) => ({
      ...prevComments,
      [tweetId]: !prevComments[tweetId],
    }));
  };
