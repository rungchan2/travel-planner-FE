import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from "../pages/Main.tsx";
import TravelList from "../pages/TravelList.tsx";
import TravelDetail from "../pages/TravelDetail";
import Container from "@/components/Container.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import Login from "@/pages/Login.tsx";
import Signup from "@/pages/Signup.tsx";
const AppRoutes: React.FC = () => {

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/travel" element={<TravelList/>}/>
        <Route path="/travel/detail" element={<TravelDetail props={null} />}/>
        {/*<Route path="/login" element={<Login/>}/>*/}
        {/*<Route path="/signup" element={<Signup/>}/>*/}

        {/*404 페이지*/}
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Container>
  );
};

export default AppRoutes;
