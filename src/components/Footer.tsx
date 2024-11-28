import styled from 'styled-components';
import Container from "./Container.tsx";
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import {Link} from "react-router-dom";
import { useState } from 'react';
import LogoutModal from '@/components/login/LogoutModal.tsx';


function Footer() {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  
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
          <div onClick={ () => setIsModalOpen(true) } >Logout</div>
        </Links>
        </Contents>
      </Container>
      
      <LogoutModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
    color: #ffffff;
    font-weight: 400;
    font-size: 1rem;
    justify-content: flex-end;
    gap: 0.6rem;
    padding-top: 0.2rem;
    text-align: right;
    cursor: pointer;
    text-decoration: underline;
`

export default Footer;