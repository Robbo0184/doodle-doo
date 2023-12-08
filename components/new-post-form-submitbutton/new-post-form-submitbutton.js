import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #4caf50;
  color: white;
  display: flex;
  text-align: center;
  align-items: center;
  height: 50px;
  padding-inline: 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Playpen Sans', sans-serif;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  @media screen and (max-width: 500px){
        width: 80px;
        height: 50px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
  }
`;

export default function SubmitButton() {
    return (
        <>
            <StyledButton type="submit">Submit</StyledButton>
        </>
    )
}