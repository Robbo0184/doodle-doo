import styled from "styled-components";
import { formatPostAge } from "@/utils/createCommentTweetAge";
import LikeButton from "../like-button/like-button";
import CommentButton from "../comment-on-comment-button/comment-button";

const StyledDiv = styled.div`

`


export default function NestedCommentContainer({
    comment,
    nestedComment,
    tweetId,
    userId,
    handleToggleLikes,
    openCommentModal
}) {
    console.log('Nested Comment ID:', nestedComment._id);

    const isLiked = nestedComment.likes?.includes(userId);

    return (
        <>
            <StyledDiv key={nestedComment._id}>
                <p>{nestedComment.commentUserId.name}</p>
                <p>{nestedComment.comment} {formatPostAge(nestedComment.date)}</p>

            </StyledDiv>
            <LikeButton
                userId={userId}
                isLiked={isLiked}
                commentId={nestedComment._id}
                tweetId={tweetId}
                handleToggleLikes={() => handleToggleLikes(tweetId, userId, nestedComment._id)} />
            <span>{nestedComment.likes?.length || 0} likes</span>
            <CommentButton
                commentId={nestedComment._id}
                onClick={() => openCommentModal(nestedComment._id)}
            />
        </>

    )
}