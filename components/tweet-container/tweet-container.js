import styled from 'styled-components';
import Image from 'next/image';
import ProfilePageLink from '../main-feed-profile-link/main-feed-profile-link';
import LikeButton from '../like-button/like-button';
import ToggleCommentsButton from '../toggle-comments-button/toggle-comments-button';
import AddCommentButton from '../add-comment-button/add-comment-button';
import CommentContainer from '../comment-container/comment-container';
import DeleteButton from '../homepage-delete-button/homepage-delete-button';
import Link from 'next/link';
import { formatPostAge } from '@/utils/createCommentTweetAge';
import LikeLink from '../like-link/like-link';


const StyledLi = styled.li`
display: flex;
flex-direction: column;
gap: 0.2rem;
align-items: center;
border: 2px solid #CCCCCC;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
border-radius: 20px;
padding: 1.5rem 2rem 2rem;
margin: 1rem;
width: 35vw;
font-family: 'Playpen Sans', sans-serif;
position: relative;
list-style-type: none;
transition: box-shadow 0.3s ease; 

&:hover {
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
}
  
&:hover .delete-button {
  opacity: 1;
}

@media screen and (max-width: 500px) {
  min-width: 65vw;
}

.delete-button {
  opacity: 0;
  transition: opacity 0.5s ease;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #CCCCCC; 
  color: #333;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 0.3rem 0.6rem;
  font-size: 0.7rem;
  cursor: pointer;
}


@media screen and (max-width: 500px){
     font-size: 0.8rem;
     width: 55vw;
     padding-inline: 2rem;

     .delete-button {
      opacity: 1;
  }
   }
`;



export default function TweetContainer({
  tweet,
  user,
  userId,
  handleToggleLikes,
  handleAddCommentClick,
  toggleComments,
  visibleComments,
  handleDeleteComment,
  handleDeleteTweet,
  session,
  setShowModal,
  setTweetId,
  isNarrowScreen

}) {

  const tweetElementId = `tweet-${tweet._id}`;
  

  return (
    <StyledLi key={tweet._id}
      id={tweetElementId}>
      <Link id='mainFeedTweetLink' href={`/users/${user._id}/tweet/${tweet._id}`}>
      {tweet.image && (
        <Image id="tweetImage" className='tweetImage' src={tweet.image} style={{ borderRadius: '15px' }} width={400} height={300} alt="tweet image" />
      )}
      <p id='homeFeedTweetText'>{tweet.tweet}  <br></br>{formatPostAge(tweet.date)}</p>
      </Link>
      <ProfilePageLink user={user} tweet={tweet} />
      <div id='likeButtonAndLikeLinkContianer'>
        <LikeButton
          tweetId={tweet._id}
          className="like--button"
          isLiked={tweet.likes.includes(userId)}
          handleToggleLikes={() => handleToggleLikes(tweet._id, userId)}
        />
        {isNarrowScreen && tweet?.likes.length > 0 ? (
          <LikeLink href={`users/${user._id}/tweet/${tweet._id}/likes`}>
            {tweet.likes?.length === 1 ? '1 like' : `${tweet.likes?.length} likes`}
          </LikeLink>
        ) : (
          <p>{tweet.likes?.length === 1 ? '1 like' : `${tweet.likes?.length} likes`}</p>
        )}
      </div>

      <div id="commentButtonsDiv">
        {tweet.comments.length > 0 && (
          <ToggleCommentsButton toggleComments={toggleComments} tweet={tweet} />
        )}
        <AddCommentButton
          tweet={tweet}
          onClick={() => handleAddCommentClick(tweet._id, setTweetId, setShowModal)}
          setTweetId={setTweetId}
        /> </div>
      {visibleComments[tweet._id] &&
        tweet.comments.map((comment, index) => (
          <CommentContainer
            formatPostAge={formatPostAge}
            user={user}
            setTweetId={setTweetId}
            isNarrowScreen={isNarrowScreen}
            key={index}
            tweet={tweet}
            comment={comment}
            userId={userId}
            handleToggleLikes={handleToggleLikes}
            handleDeleteComment={(commentId) => handleDeleteComment(commentId, tweet._id)}
          />
        ))}
      {(session?.user?.name === tweet.userName || session?.user?.isAdmin) && (
        <DeleteButton
          className="delete-button"
          handleDeleteTweet={() => handleDeleteTweet(tweet._id)}
          tweetId={tweet._id}>
          ❌
        </DeleteButton>
      )}
    </StyledLi>
  );
}
