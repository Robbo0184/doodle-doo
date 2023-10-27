import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import DoodleDooLogo from "../../../../public/assets/hen.png"
import Navbar from "../../../../components/navbar/navbar";
import styled from "styled-components";
import { useState } from "react";

const ImageDiv = styled.div`
   display: flex;
   justify-content: flex-end;
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const TextArea = styled.textarea`
  width: 80%;
  min-height: 300px;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

export default function NewPostForm() {
    const router = useRouter()
    const { id: userId } = router.query
    const { mutate, data } = useSWR(`/api/users/${userId}`);
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
    
        
        const response = await fetch(`/api/users/${userId}`, {
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
    
        router.push(`/users/${userId}`);
        
    }
    

    return (
        <>
        <ImageDiv>
        <Image src={DoodleDooLogo} width={140} alt="logo"></Image>
        </ImageDiv>
            <FormContainer>
                <form onSubmit={handleSubmitTweet}>
                    <TextArea
                        name="tweet"
                        value={tweet}
                        placeholder="whats on your mind???"
                        onChange={(e) => setTweet(e.target.value)}
                    ></TextArea>
                    <SubmitButton type="submit">Submit</SubmitButton>
                </form>
            </FormContainer>
            <Navbar />

        </>
    )

}