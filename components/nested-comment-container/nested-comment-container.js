import styled from "styled-components";
import { formatPostAge } from "@/utils/createCommentTweetAge";
import LikeButton from "../like-button/like-button";
import CommentButton from "../comment-on-comment-button/comment-button";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "../homepage-delete-button/homepage-delete-button";
import { useSession } from "next-auth/react";

const StyledDiv = styled.div`
     border: 1px solid #e0e0e0; 
     border-radius: 10px; 
     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
     padding: 10px 50px;
     margin-bottom: 15px;
     display: flex;
     flex-direction: column;
     width: 100%;
     position: relative;
     &:hover .delete-button {
        opacity: 1;
      }
     `


const ButtonsDiv = styled.div`
        display: flex;
        justify-content: space-evenly;
        width: calc(100% + 100px); 
        margin-left: -50px; 
        margin-right: -50px; 
    `

const ImageWrapper = styled.div`
         display: flex;
         justify-content: space-evenly;
         width: calc(100% + 100px); 
         margin-left: -50px; 
         margin-right: -50px; 
         
    `

const DeleteButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: -1rem;
  
`;

export default function NestedCommentContainer({
    nestedComment,
    tweetId,
    userId,
    handleToggleLikes,
    handleDeleteComment,
    openCommentModal
}) {
    const { data: session } = useSession();
    const isLiked = nestedComment.likes?.includes(userId);
    
    
    return (
        <>
            <StyledDiv key={nestedComment._id}>
                <Link id="commentProfilePageLink" href={`/users/${nestedComment.commentUserId._id}`}>

                    <ImageWrapper>
                        <Image id="commentContainerUserIcon"
                            src={nestedComment.commentUserId.image}
                            style={{ borderRadius: '50px' }}
                            height={35}
                            width={35}
                            alt="user-image" />

                        <div>{nestedComment.commentUserId.name}</div>
                    </ImageWrapper>
                </Link>

                <p id="nestedCommentComment"><strong>{nestedComment.comment}</strong></p>
                <p><small>{formatPostAge(nestedComment.date)}</small></p>
                <ButtonsDiv>
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
                </ButtonsDiv>
                {session?.user?.name === nestedComment?.commentUserId?.name && (
                    <DeleteButtonContainer>
                        <DeleteButton className="nestedComment--container--delete--button" handleDeleteComment={handleDeleteComment} commentId={nestedComment._id}  userId={userId}  > ❌
                        </DeleteButton>
                    </DeleteButtonContainer>
                )}
            </StyledDiv>
        </>

    )
}