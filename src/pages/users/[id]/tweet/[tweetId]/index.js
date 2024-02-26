import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";
import LikeButton from "../../../../../../components/like-button/like-button";
import { handleToggleLikes } from "@/utils/handleToggleLikes";
import AddCommentButton from "../../../../../../components/add-comment-button/add-comment-button";
import ToggleCommentsButton from "../../../../../../components/toggle-comments-button/toggle-comments-button";
import { toggleComments } from "@/utils/toggleComments";
import CommentContainer from "../../../../../../components/comment-container/comment-container";
import { handleDeleteComment } from "@/utils/handleDeleteComment";

export default function TweetPage() {
    const router = useRouter();
    const { id: userId, tweetId } = router.query;
    const [visibleComments, setVisibleComments] = useState({});
    const { data: tweet } = useSWR(`/api/tweets/${tweetId}`);
   
    const handleToggleComments = () => {
        toggleComments(tweetId, setVisibleComments);
    }

    if (!tweet) {
        return <div>Loading tweet...</div>;
    }
    sessionStorage.setItem('currentTweetId', tweetId);

    return (
        <>
            <main id="tweetPageMain">
                <Link id="tweetPageLink" href={`/?tweetId=${tweetId || ''}`}>Back To Main Feed</Link>
                <div id="tweetPageTweetContainer">

                    {
                        tweet?.image &&
                        <div id="tweetPageImageContainer">
                            <Image id="tweetPageImage" alt="image" src={tweet?.image} style={{ borderRadius: '15px' }} height={500} width={600}></Image>
                        </div>
                    }

                    {
                        tweet?.tweet &&
                        <div className={!tweet?.image ? "center-tweet-container" : "tweetPageTweetTextContainer"}>
                            <p id="tweetPageTweetText">{tweet?.tweet}</p>
                        </div>

                    }

                    <LikeButton
                        className="like--button"
                        isLiked={tweet?.likes.includes(userId)}
                        tweetId={tweet?.tweet._id}
                        handleToggleLikes={() => handleToggleLikes(tweet._id, userId)}
                    />
                    {tweet.likes?.length === 1 ? (
                        <p>1 like</p>
                    ) : (
                        <p>{tweet.likes?.length} likes</p>
                    )}

                    <div id="commentButtonsDiv">
                        {tweet.comments.length > 0 && (
                            <ToggleCommentsButton toggleComments={handleToggleComments} tweet={tweet} />
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
                </div>
            </main>
        </>
    )
}