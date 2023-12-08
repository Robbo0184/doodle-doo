import styled from 'styled-components';
import { useState } from 'react';
import Image from 'next/image';
import ProfilePageLink from '../main-feed-profile-link/main-feed-profile-link';
import LikeButton from '../like-button/like-button';
import ToggleCommentsButton from '../toggle-comments-button/toggle-comments-button';
import AddCommentButton from '../add-comment-button/add-comment-button';
import CommentContainer from '../comment-container/comment-container';
import DeleteButton from '../homepage-delete-button/homepage-delete-button';
import Link from 'next/link';

const StyledLi = styled.li`
display: flex;
flex-direction: column;
gap: 0.2rem;
align-items: center;
border: 2px solid #CCCCCC;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
border-radius: 20%;
padding: 1.5rem 2rem 2rem;
margin: 1rem;
max-width: 65vw;
font-family: 'Playpen Sans', sans-serif;
position: relative;
list-style-type: none;
transition: box-shadow 0.3s ease; 
&:hover {
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 500px){
     font-size: 0.8rem;
     min-width: 40vw;
     padding-inline: 2rem;
   }
`;

export default function TweetContainer({
  tweet,
  user,
  userId,
  tweetId,
  handleToggleLikes,
  handleAddCommentClick,
  toggleComments,
  visibleComments,
  handleDeleteComment,
  handleDeleteTweet,
  session,
}) {
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  return (
    <StyledLi key={tweet._id}
      onMouseEnter={() => setShowDeleteButton(true)}
      onMouseLeave={() => setShowDeleteButton(false)}>
      {tweet.tweet}
      {tweet.image && (
        <Link href={`../users/${user._id}/tweet/${tweet._id}`}>
          <Image id="tweetImage" src={tweet.image} style={{ borderRadius: '12%' }} width={400} height={300} alt="tweet image" />
        </Link>
      )}
      <ProfilePageLink user={user} tweet={tweet} />
      <LikeButton
        className="like--button"
        isLiked={tweet.likes.includes(userId)}
        tweetId={tweet._id}
        handleToggleLikes={() => handleToggleLikes(tweet._id)}
      />
      {tweet.likes?.length === 1 ? (
        <p>1 like</p>
      ) : (
        <p>{tweet.likes?.length} likes</p>
      )}
      <div id="commentButtonsDiv">
        {tweet.comments.length > 0 && (
          <ToggleCommentsButton toggleComments={toggleComments} tweet={tweet} />
        )}
        <AddCommentButton tweet={tweet} onClick={() => handleAddCommentClick(tweet._id)} />
      </div>
      {visibleComments[tweet._id] &&
        tweet.comments.map((comment, index) => (
          <CommentContainer
            key={index}
            comment={comment}
            handleDeleteComment={handleDeleteComment}
          />
        ))}
      {session?.user?.name === tweet.userName && (
        <DeleteButton showonhover={showDeleteButton} handleDeleteTweet={() => handleDeleteTweet(tweet._id)} tweetId={tweet._id}>
          ❌
        </DeleteButton>

      )}
    </StyledLi>
  );
}
