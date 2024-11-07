import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CardTravelIcon from "@mui/icons-material/CardTravel";

export default function NavBar() {
  return (
    <NavBarContainer>
      <ModifiedContainer>
        <IconContainer>
          <CardTravelIcon />
          <NavBarItem to="/">Home</NavBarItem>
        </IconContainer>
        <LinkContainer>
          <NavBarItem to="/travel">Travel</NavBarItem>
          <NavBarItem to="/mypage">MyPage</NavBarItem>
        </LinkContainer>
      </ModifiedContainer>
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  box-shadow: var(--basicShadow);
  position: sticky;
  top: 0;
  z-index: 999;
  padding: 1rem 0;
`;

const ModifiedContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 2rem;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavBarItem = styled(Link)`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease-in-out;

    &:hover {
        text-decoration: none;
        color: #007bff;
        transform: translateY(-2px);
    }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  
  svg {
    color: #007bff;
    font-size: 1.5rem;
  }
`;
