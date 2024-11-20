import "./App.css";
import NavBar from "./components/NavBar";
import Main from "./pages/Main.tsx";
import MyPage from "./pages/MyPage.tsx";
import TravelDetail from "./pages/TravelDetail";
import TravelList from "./pages/TravelList.tsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
<!-- 
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import {AuthProvider} from "@/lib/AuthContext.tsx";
import AppRoutes from "@/routes/AppRoutes.tsx";
 -->

function App() {

  return (
      <AuthProvider>
        <BrowserRouter future={{v7_startTransition: true}}>
          <NavBar />
          <AppRoutes/>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
