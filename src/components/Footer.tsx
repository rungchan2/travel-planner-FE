import styled from 'styled-components';
import Container from "./Container.tsx";
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import {Link} from "react-router-dom";
import {signOut} from "./login/auth.ts";


function Footer() {
  return (
    <FooterBase>
      <Container>
        <Contents>
        <TextArea>
          <MainTitle>
            <CardTravelOutlinedIcon/>
            <h4>Travel Planner</h4>
          </MainTitle>
          <Copyright>
            Copyright © Travel Planner. All rights reserved.
          </Copyright>
        </TextArea>
        <Links>
          <Link to={'/'}>Main</Link>
          <Link to={'/travel'}>Travel</Link>
          <div onClick={signOut} >Logout</div>
        </Links>
        </Contents>
      </Container>
    </FooterBase>
  );
}

const FooterBase = styled.div`
    width: 100%;
    padding: 3rem 0;
    background-color: #222;
    z-index: 999999;
`;

const Contents = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const TextArea = styled.div`
  display: flex;
    flex-direction: column;
    gap: 6rem;
    height: 100%;
`

const MainTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 28px;
    font-weight: 600;

    svg {
        font-size: 2rem;
        color: #ffffff;
    }

    h4 {
        font-size: 2rem;
        font-weight: 600;
        color: #ffffff;
    }
`

const Copyright = styled.div`
        font-size: 1rem;
        font-weight: 400;
        color: #d1d1d1;
    
`

const Links = styled.div`
    display: flex;
    flex-direction: column;
    color: #d9d9d9;
    font-weight: 600;
    font-size: 1.6rem;
    justify-content: space-between;
    padding-top: 0.2rem;
text-align: right;
    cursor: pointer;
    text-decoration: underline;
`

export default Footer;