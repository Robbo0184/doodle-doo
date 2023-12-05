import styled from "styled-components";


const StyledLink = styled.a`
  text-decoration: none;
  color: #1565c0; 
  transition: color 0.3s ease;

  &:hover {
    color: #1e88e5;
  }
`;

export default function ProfilePageLink({ user, tweet }) {
    return (
        <>
            <StyledLink href={`../users/${user._id}`} >
                <span>{tweet.userName}</span>
            </StyledLink>
        </>
    );
}