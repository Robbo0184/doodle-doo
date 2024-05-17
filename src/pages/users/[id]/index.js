import { useRouter } from "next/router";
import Navbar from "../../../../components/navbar/navbar";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import Image from "next/image";
import DoodleDoLogo from "../../../../public/assets/hen.png";
import BioModal from "../../../../components/bio-modal/bio-modal";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import AddBioButton from "../../../../components/add-bio-button/add-bio-button";
import UserBioContainer from "../../../../components/user-bio-container/user-bio-container";
import ProfilePageTweetContainer from "../../../../components/profile-page-tweet-container/profile-page-tweet-container";
import { handleAddCommentClick } from "@/utils/handleAddCommentClick";
import CommentModal from "../../../../components/comment-modal/comment-modal";
import { handleDeleteComment } from "@/utils/handleDeleteComment";
import { handleToggleLikes } from "@/utils/handleToggleLikes";
import { handleDeleteTweet } from "@/utils/handleDeleteTweet";
import { handleDeleteBio } from "@/utils/handleDeleteBio";
import FollowUserButton from "../../../../components/follow-user-button/follow-user-button";
import { handleToggleFollower } from "@/utils/handleToggleFollower";
import styled from "styled-components";

const FollowersLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: inherit; 
`;

export default function ProfilePage() {
  const [showBioModal, setShowBioModal] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [isFollower, setIsFollower] = useState(false);
  const [visibleComments, setVisibleComments] = useState({});
  const [getTweetId, setTweetId] = useState('');
  const { data: session } = useSession();
  const router = useRouter();
  const { id: userId } = router.query;
  const sessionId = session?.user?.userId;
  const initialLoad = useRef(true);
  
  const { data: user, isLoading, mutate, error } = useSWR(userId ? `/api/users/${userId}` : null);
  
  
  const toggleComments = (tweetId) => {
    setVisibleComments((prevComments) => ({
      ...prevComments,
      [tweetId]: !prevComments[tweetId],
    }));
  };

  useEffect(() => {
    function handleResize() {
      setIsNarrowScreen(window.innerWidth < 500);
    }
    
    window.addEventListener('resize', handleResize);
    
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    if (user && initialLoad.current) {
      setIsFollower(user.followers.includes(sessionId));
      initialLoad.current = false; 
    }
  }, [user, sessionId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data: {error.message}</div>;
  }

  if (!user) return;

  const toggleFollower = async () => {
    console.log("Session ID:", sessionId); 
    console.log("User ID:", userId);

    await handleToggleFollower(setIsFollower, sessionId, userId, isFollower); 
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="profile--page--main">
        <div className="profile-page-main-container">
          <div className="personal--content--div">
            <Image
              className="user--image"
              src={user.image}
              width={160}
              height={160}
              alt="profile-pic"
              style={{ borderRadius: '50%' }}
            />

            <h1 className="profile--page--header">
              {user.name}
            </h1>

            <Image
              className="doodle--doo--logo"
              src={DoodleDoLogo}
              width={160}
              alt="doodle-doo-logo"
            />

            <h3 className="user--email--heading">
              {user.email}
            </h3>

            {session?.user?.userId === userId ?
              <AddBioButton
                className="bio--button"
                onClick={() => {
                  setShowBioModal(true);
                }}
              /> : <FollowUserButton
                sessionId={sessionId}
                toggleFollower={toggleFollower}
                isFollower={isFollower}
              />
            }
            {user.bio && (
              <UserBioContainer user={user} handleDeleteBio={handleDeleteBio} />
            )}
            <FollowersLink id="profilePageFollowerCount" href={isNarrowScreen && user.followers.length > 0 ? `/users/${user._id}/followers` : undefined} style={{ pointerEvents: isNarrowScreen ? 'auto' : 'none' }}>
              <p>
                {`${user.followers.length} ${user.followers.length === 1 ? 'Follower' : 'Followers'}`}
              </p>
            </FollowersLink>
            {showBioModal && (
              <BioModal onClose={() => setShowBioModal(false)} />
            )}
          </div>
          <ProfilePageTweetContainer
            user={user}
            isNarrowScreen={isNarrowScreen}
            mutate={mutate}
            handleAddCommentClick={handleAddCommentClick}
            handleToggleLikes={handleToggleLikes}
            setShowCommentModal={setShowCommentModal}
            setTweetId={setTweetId}
            toggleComments={toggleComments}
            visibleComments={visibleComments}
            handleDeleteComment={handleDeleteComment}
            handleDeleteTweet={handleDeleteTweet}
            tweets={user.tweets}
          />
          {showCommentModal ? (
            <CommentModal
              tweetId={getTweetId}
              onClose={() => setShowCommentModal(false)}
            />
          ) : null}
        </div>
        <Navbar />
      </main>
    </>
  );
}
