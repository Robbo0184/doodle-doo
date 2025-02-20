import styled from "styled-components";
import { formatPostAge } from "@/utils/createCommentTweetAge";
import LikeButton from "../like-button/like-button";
import CommentButton from "../comment-on-comment-button/comment-button";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "../homepage-delete-button/homepage-delete-button";
import { useSession } from "next-auth/react";

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
  
  `

const StyledDiv = styled.div`
     border: 0.2px solid #e0e0e0; 
     border-radius: 10px; 
     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
     padding: 20px 40px;
     margin-bottom: 15px;
     display: flex;
     flex-direction: column;
     align-items: center;
     position: relative;
     font-family: "Playpen Sans", sans-serif;


     &:hover ${StyledDeleteButton} {
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
         align-items: center;
         width: calc(100% + 100px); 
         margin-left: -50px; 
         margin-right: -50px; 
         gap: 1.5rem;
         
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


    if (!nestedComment || !nestedComment.commentUserId) {
        return null;
    }

    const isLiked = nestedComment.likes?.includes(userId);


    return (
        <>
            <StyledDiv key={nestedComment._id} style={{ marginLeft: '1rem' }}>
                <Link id="commentProfilePageLink" href={`/users/${nestedComment.commentUserId._id}`}>

                    <ImageWrapper>
                        <Image id="commentContainerUserIcon"
                            src={nestedComment.commentUserId.image}
                            style={{ borderRadius: '50px' }}
                            height={40}
                            width={40}
                            alt="user-image" />

                        <div id="nestedCommentUserName">{nestedComment.commentUserId.name}</div>
                    </ImageWrapper>
                </Link>

                <p id="nestedCommentComment">{nestedComment.comment}</p>
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
                        <StyledDeleteButton
                            className="nestedComment--container--delete--button"
                            handleDeleteComment={() => handleDeleteComment(
                                nestedComment._id,
                                tweetId,
                                userId,
                                nestedComment.parentCommentId
                            )}
                            commentId={nestedComment._id}
                            userId={userId}
                        >
                            ❌
                        </StyledDeleteButton>
                    </DeleteButtonContainer>
                )}


            </StyledDiv>
            {nestedComment.comments && nestedComment.comments.length > 0 && (
                <div style={{ marginLeft: '2rem' }}>
                    {nestedComment.comments.map((childComment) => (
                        <NestedCommentContainer
                            key={childComment._id}
                            nestedComment={childComment}
                            tweetId={tweetId}
                            userId={userId}
                            handleToggleLikes={handleToggleLikes}
                            handleDeleteComment={handleDeleteComment}
                            openCommentModal={openCommentModal}
                        />
                    ))}
                </div>
            )}
        </>

    )
}