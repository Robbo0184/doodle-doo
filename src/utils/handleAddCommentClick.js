// export function handleAddCommentClick(tweetId, setTweetId, setShowModal)
//   {
//     console.log("tweetId before modal/update", tweetId, typeof tweetId);
//     setShowModal(true);
//     console.log("tweetId after modal/update", tweetId, typeof tweetId);
//     setTweetId(tweetId);
//     console.log("tweetId from function",tweetId);
//   };

//   export function handleAddCommentClick (tweetId, setShowModal, setTweetId)  {
//     setShowModal(true);
//     setTweetId(tweetId);
//     console.log("Log tweetID from comment click fuction", tweetId);
    
//   };

export function handleAddCommentClick(  tweetId, setTweetId, setShowModal) {
    setShowModal(true);
    setTweetId(tweetId);

  }
  