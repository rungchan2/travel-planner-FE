import React, {useContext} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import { AuthContext } from '../lib/AuthContext';
import GoogleLoginModal from '../components/login/LoginModal.tsx';
import Main from "../pages/Main.tsx";
import TravelList from "../pages/TravelList.tsx";
import TravelDetail from "../pages/TravelDetail";
import CircularIndeterminate from "@/components/login/LoadingIcon.tsx";
import Container from "@/components/Container.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import Login from "@/pages/Login.tsx";
import Signup from "@/pages/Signup.tsx";
const AppRoutes: React.FC = () => {
  const {user, loading} = useContext(AuthContext);

  // ?skipLogin=true일 시 로그인 모달 패스
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const skipLogin = params.get('skipLogin') === 'true';

  // 임시 로딩 확인 중
  if (loading) {
    return (
      <CircularIndeterminate/>
    )
  }

  if (!user && !skipLogin) {
    return <GoogleLoginModal/>;
  }


  return (
    <Container>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/travel" element={<TravelList/>}/>
        <Route path="/travel/detail" element={<TravelDetail props={null} />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>

        {/*404 페이지*/}
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Container>
  );
};

export default AppRoutes;
