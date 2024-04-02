import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  min-height: 50vh;
  line-height: 2rem;
  padding-top: 0.5rem;
  gap: 1rem;
  margin-bottom: 40px;
  padding-bottom: calc(10vh + 50px);

  `;

export default function HomepageMainDiv({ children }) {
    return (
        <StyledDiv>
            {children}
        </StyledDiv>
    )
}