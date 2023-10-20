import styled from "styled-components";
import Image from "next/image";
import likeIconEmpty from "../../public/assets/like-icon-empty.svg";
import likeIconFull from "../../public/assets/like-icon-filled.svg";
import { useSession } from "next-auth/react";
import useSWR from "swr";



export const StyledButton = styled.button`
   border: none;
   position: absolute;
   background-color: white;
   right: 0px;
   bottom: 0;
`

export default function LikeButton({tweetId}) {
    const { data: session } = useSession();
    const {userId} = session.user
    
   
   
    // const { mutate, data } = useSWR(`/api/tweets/${tweetId}`);

   async function handleToggleLikes() {
        const userData = session;
    
        if (!userData) {
            console.error("User data not available");
            return;
        }

        const response = await fetch(`/api/tweets/${tweetId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userId),
        })

      

        // if (response.ok) {
        //     mutate();
        // } else {
        //     console.error(`Error: ${response.status}`);
        // };

    }
    









    return (
        <StyledButton onClick={handleToggleLikes}>
            <Image src={likeIconEmpty} alt="empty like icon" width={20} height={20} />
        </StyledButton>
    )
}