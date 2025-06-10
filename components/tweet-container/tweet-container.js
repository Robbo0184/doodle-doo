import styled from 'styled-components';
import Image from 'next/image';
import ProfilePageLink from '../main-feed-profile-link/main-feed-profile-link';
import LikeButton from '../like-button/like-button';
import ToggleCommentsButton from '../toggle-comments-button/toggle-comments-button';
import AddCommentButton from '../add-comment-button/add-comment-button';
import DeleteButton from '../homepage-delete-button/homepage-delete-button';
import Link from 'next/link';
import { formatPostAge } from '@/utils/createCommentTweetAge';
import LikeLink from '../like-link/like-link';

const StyledDeleteButton = styled(DeleteButton)`
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #cccccc;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 0.3rem 0.6rem;
  font-size: 0.7rem;
  cursor: pointer;
  
  @media screen and (max-width: 500px) {
    opacity: 1;
  }
`;

const StyledLi = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 3rem;
  border: 0.2px solid #e0e0e0; 
  border-radius: ${props => props.hasVisibleComments ? '20px 20px 0 0' : '20px'};
  box-shadow: ${props => props.hasVisibleComments ?
    '-3px 0 3px -3px rgba(0, 0, 0, 0.1), 3px 0 3px -3px rgba(0, 0, 0, 0.1), 0 -3px 3px -3px rgba(0, 0, 0, 0.1)' :
    '0 4px 8px rgba(0, 0, 0, 0.1)'
  };
  padding: 1.2rem 1.5rem;
  width: 40vw;
  cursor: pointer;
  font-family: 'Playpen Sans', sans-serif;
  position: relative;
  list-style-type: none;
  
  ${props => props.hasVisibleComments && `
    border-bottom: none;
  `}

  &:hover {
    box-shadow: ${props => props.hasVisibleComments ?
    '-5px 0 5px -4px rgba(0, 0, 0, 0.2), 5px 0 5px -4px rgba(0, 0, 0, 0.2), 0 -5px 5px -4px rgba(0, 0, 0, 0.2)' :
    '0 6px 12px rgba(0, 0, 0, 0.2)'
  };
  }
  
  transition: box-shadow 0.3s ease; 
  
  &:hover ${StyledDeleteButton} {
    opacity: 1;
  }

  @media screen and (max-width: 500px) {
    width: 55vw;
    padding: 1rem;
    font-size: 0.9rem;
  }
`;

const TweetContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start; 
  align-items: center; 
  gap: 1rem;
  margin-top: -1.3rem; 
  
  #homeFeedTweetText {
    margin: 0.8rem 0;
    font-size: 1.2rem;
    text-align: left;
  }
  
  @media screen and (max-width: 500px) {
    #homeFeedTweetText {
      font-size: 1rem;
    }
  }
`;

const UsernameAndTweetDateContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.5rem;
`;


const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`;


const LikeContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1.2rem;
  margin-top: -0.8rem; 
  
  p, a {
    font-size: 1rem;
    color: #555;
    
    @media screen and (max-width: 500px) {
      font-size: 0.9rem;
    }
  }
`;

const TimestampText = styled.span`
  white-space: nowrap; 
  display: inline-block; 
  `;


const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  margin-top: 0.5rem;
`;

const DeleteButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export default function TweetContainer({
  tweet,
  user,
  userId,
  handleToggleLikes,
  handleAddCommentClick,
  toggleComments,
  handleDeleteTweet,
  session,
  setShowModal,
  setTweetId,
  isNarrowScreen,
  visibleComments
}) {
  const tweetElementId = `tweet-${tweet._id}`;

  return (
    <StyledLi
      key={tweet._id}
      id={tweetElementId}
      hasVisibleComments={visibleComments && visibleComments[tweet._id]}
    >
      <UsernameAndTweetDateContainer>
        <ProfilePageLink user={user} tweet={tweet} />
        <TimestampText>{formatPostAge(tweet.date)}</TimestampText>
      </UsernameAndTweetDateContainer>
      <Link id='mainFeedTweetLink' href={`/users/${user._id}/tweet/${tweet._id}`} style={{ width: '100%' }}>
        <TweetContent>
          {tweet.image && (
            <ImageContainer>
              <Image
                id="tweetImage"
                className='tweetImage'
                src={tweet.image}
                style={{ borderRadius: '15px' }}
                width={400}
                height={300}
                alt="tweet image"
              />
            </ImageContainer>
          )}
          <p id='homeFeedTweetText'>
            {tweet.tweet}
          </p>
        </TweetContent>
      </Link>


      <LikeContainer>
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
      </LikeContainer>

      <ButtonsContainer>
        {tweet.comments.length > 0 && (
          <ToggleCommentsButton toggleComments={() => toggleComments(tweet._id)} tweet={tweet} />
        )}
        <AddCommentButton
          tweet={tweet}
          onClick={() => handleAddCommentClick(tweet._id, setTweetId, setShowModal)}
          setTweetId={setTweetId}
        />
      </ButtonsContainer>

      {(session?.user?.name === tweet.userName || session?.user?.isAdmin) && (
        <DeleteButtonContainer>
          <StyledDeleteButton
            className="delete-button"
            handleDeleteTweet={() => handleDeleteTweet(tweet._id)}
            tweetId={tweet._id}
          >
            ❌
          </StyledDeleteButton>
        </DeleteButtonContainer>
      )}
    </StyledLi>
  );
}