import useSWR from "swr";
import { useRouter } from "next/router";
// import Tweet from "../../../../db/models/Tweet";
import Navbar from "../../../../components/navbar/navbar";
import styled from "styled-components";
import { useState } from "react";
const TextArea = styled.textarea`
        width: 40vw;
        min-height: 40vh;
        color: black;
    `
    ;
const StyledDiv = styled.div`
     display: flex;
     justify-content: center;
     align-items: center;
     padding-top: 2rem;
       
`
    ;

export default function NewPostForm() {
    const router = useRouter()
    const { id } = router.query
    const { mutate, data } = useSWR(`/api/users/${id}`);
    const [tweet, setTweet] = useState("");

    async function handleSubmitTweet(event) {
        event.preventDefault();
        
       
        const userData = data;
    
        if (!userData) {
            console.error("User data not available");
            return;
        }
    
        
        const userName = userData.name;
    
        const formData = new FormData(event.target);
        const tweetContent = formData.get('tweet');
    
        
        const tweetData = {
            tweet: tweetContent,
            userName: userName,
            
        };
    
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        tweetData.date = currentDate;
    
        setTweet('');
    
        
        const response = await fetch(`/api/users/${id}/tweets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tweetData),
        });
    
        if (response.ok) {
            mutate();
        } else {
            console.error(`Error: ${response.status}`);
        }
    
        router.push(`/users/${id}`);
        console.log("Tweet data:", tweetData);
    }
    

    return (
        <>
            <StyledDiv>
                <form onSubmit={handleSubmitTweet}>
                    <TextArea
                        name="tweet"
                        value={tweet}
                        placeholder="whats on your mind???"
                        onChange={(e) => setTweet(e.target.value)}
                    ></TextArea>
                    <button type="submit">Submit</button>
                </form>
            </StyledDiv>
            <Navbar />

        </>
    )

}