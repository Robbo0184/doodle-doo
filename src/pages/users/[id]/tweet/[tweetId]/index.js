import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import useSWR from "swr";
import Link from "next/link";
import LikeButton from "../../../../../../components/like-button/like-button";
import { handleToggleLikes } from "@/utils/handleToggleLikes";
import AddCommentButton from "../../../../../../components/add-comment-button/add-comment-button";
import ToggleCommentsButton from "../../../../../../components/toggle-comments-button/toggle-comments-button";
import { toggleComments } from "@/utils/toggleComments";
import CommentContainer from "../../../../../../components/comment-container/comment-container";
import { handleDeleteComment } from "@/utils/handleDeleteComment";
import DeleteButton from "../../../../../../components/homepage-delete-button/homepage-delete-button";
import CommentModal from "../../../../../../components/comment-modal/comment-modal";
import { handleAddCommentClick } from "@/utils/handleAddCommentClick";
import Navbar from "../../../../../../components/navbar/navbar";
import { formatPostAge } from "@/utils/createCommentTweetAge";
import { handleDeleteTweet } from "@/utils/handleDeleteTweet";

const LikeLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: inherit; 

  @media (min-width: 501px) {
    pointer-events: none;
  }
`;

export default function TweetPage() {
    const router = useRouter();
    const { id: userId, tweetId } = router.query;
    const [visibleComments, setVisibleComments] = useState({});
    const [showModal, setShowModal] = useState(false);
    const { data: tweet } = useSWR(`/api/tweets/${tweetId}`);
    const { data: session } = useSession();
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [getTweetId, setTweetId] = useState("")
    const { data: user, isLoading, mutate, error } = useSWR(userId ? `/api/users/${userId}` : null);
    const [showUserInfo, setShowUserInfo] = useState(true);
    const [isNarrowScreen, setIsNarrowScreen] = useState(false);
    

    const handleToggleComments = () => {
        toggleComments(tweetId, setVisibleComments);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setShowUserInfo(false);
            } else {
                setShowUserInfo(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        function handleResize() {
          setIsNarrowScreen(window.innerWidth < 500);
        }
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => window.removeEventListener('resize', handleResize);
      }, []); 
    

    if (!tweet) {
        return <div>Loading tweet...</div>;
    }
    sessionStorage.setItem('currentTweetId', tweetId);

    return (
        <>
            <main id="tweetPageMain">

                <Link id="tweetPageLink" className={!showUserInfo ? 'hidden' : ''} href={`/?tweetId=${tweetId || ''}`}>Back To Main Feed</Link>
                <Link id="tweetPageUserProfileLink" href={`/users/${userId}`}>
                    <div id="userInfoContainer" className={!showUserInfo ? 'hidden' : ''}>
                        {user?.image && (
                            <Image
                                className="user--image--tweetpage"
                                src={user?.image}
                                width={150}
                                height={150}
                                alt="profile-pic"
                                style={{ borderRadius: '50%' }}
                            />
                        )}
                        <p id="tweetPageUsernameText">{user?.name}</p>
                    </div>
                </Link>

                <div id="tweetPageTweetContainer" className={!tweet.image ? "no--image--tweet--container" : ""}>

                    {
                        tweet?.image &&
                        <div id="tweetPageImageContainer">
                            <Image id="tweetPageImage" alt="image" src={tweet?.image} style={{ borderRadius: '15px' }} height={500} width={600}></Image>
                        </div>
                    }

                    {
                        tweet?.tweet &&
                        <div className={!tweet?.image ? "center-tweet-container" : "tweetPageTweetTextContainer"}>
                            <p id="tweetPageTweetText">{tweet?.tweet} <br></br> {formatPostAge(tweet.date)}</p>
                            {session?.user?.name === tweet.userName && (
                                <DeleteButton className="delete-button" showonhover={showDeleteButton} shouldRedirect={true} handleDeleteTweet={() => handleDeleteTweet(tweet._id)} tweetId={tweet._id}>
                                    ❌
                                </DeleteButton>
                            )}
                        </div>

                    }

                    <LikeButton
                        className="like--button"
                        isLiked={tweet?.likes.includes(userId)}
                        tweetId={tweet?.tweet._id}
                        handleToggleLikes={() => handleToggleLikes(tweet._id, userId)}
                    />
                    {user && tweet && isNarrowScreen ? (
                        <LikeLink href={`/users/${user._id}/tweet/${tweet._id}/likes`}>
                          {tweet.likes?.length === 1 ? '1 like' : `${tweet.likes?.length} likes`}
                        </LikeLink>
                      ) : (
                        <p>Loading...</p> // Or any other placeholder content
                      )}

                    <div id="commentButtonsDiv">
                        {tweet.comments.length > 0 && (
                            <ToggleCommentsButton toggleComments={handleToggleComments} tweet={tweet} />
                        )}
                        <AddCommentButton
                            tweet={tweet} onClick={() => handleAddCommentClick(tweet._id, setTweetId, setShowModal)}
                            setTweetId={setTweetId} />
                    </div>
                    {visibleComments[tweet._id] &&
                        tweet.comments.map((comment, index) => (
                            <CommentContainer
                                key={index}
                                tweet={tweet}
                                comment={comment}
                                handleDeleteComment={(commentId) => handleDeleteComment(commentId, tweet._id)}                            />
                        ))}
                    {showModal && (
                        <CommentModal
                            tweetId={getTweetId}
                            onClose={() => setShowModal(false)}
                        />
                    )}
                </div>
                <Navbar>
                </Navbar>
            </main>
        </>
    )
}