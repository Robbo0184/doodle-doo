import styled from "styled-components";
import HomeNavIcon from "../home-nav-icon/home-nav-icon";
import NewPostButton from "../new-post-button/new-post-button";
import ProfilePageIcon from "../profile-icon/profile-icon";

const StyledNav = styled.nav`
       display: flex;
       justify-content: space-around;
       align-items: center;
       height: 10vh;
       width: 100vw;
       background-color: #D6D6D6;
       position: fixed;
       bottom: 0
       `



export default function Navbar() {


  return (
    <StyledNav>
    <HomeNavIcon />
    <ProfilePageIcon />
    <NewPostButton />
  </StyledNav>

  )

}