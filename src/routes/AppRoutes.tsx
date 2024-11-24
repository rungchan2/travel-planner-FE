import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from "../pages/Main.tsx";
import TravelList from "../pages/TravelList.tsx";
import TravelDetail from "../pages/TravelDetail";
import Container from "@/components/Container.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";

const AppRoutes: React.FC = () => {

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/travel" element={<TravelList/>}/>
        <Route path="/travel/:id" element={<TravelDetail/>}/>

        {/*404 페이지*/}
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Container>
  );
};

export default AppRoutes;
