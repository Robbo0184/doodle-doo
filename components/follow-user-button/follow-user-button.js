import styled from "styled-components";


const StyledButton = styled.button`
border: none;
border-radius: 5px;
color: white;
font-size: rem;
cursor: pointer; 
background: linear-gradient(135deg, #4e54c8, #8f94fb);
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
transition: transform 0.3s ease, box-shadow 0.3s ease;

&:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}
`

export default function FollowUserButton({ toggleFollower, isFollower }) {

    return (
        <>

            <StyledButton
                className="bio--button"
                onClick={toggleFollower}
            >     {isFollower ? "Unfollow" : "Follow"}
            </StyledButton>

        </>
    )
}