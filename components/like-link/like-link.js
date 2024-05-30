import styled from "styled-components";
import Link from "next/link";

const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none !important;
  color: inherit;

  &:hover, &:focus, &:active {
    text-decoration: none !important; 
  }

  @media (min-width: 501px) {
    pointer-events: none;
  }
`;

const StyledLinkText = styled.span`
  color: inherit;
`;

export default function LikeLink({ href, children }) {
    return (
        <StyledLink href={href} passHref>
            <StyledLinkText>
                {children}
            </StyledLinkText>
        </StyledLink>
    );
}

