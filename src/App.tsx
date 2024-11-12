import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Main from "./pages/Main.tsx";
import TravelList from "./pages/TravelList.tsx";
import NavBar from "./components/NavBar";
import MyPage from "./pages/MyPage.tsx";
import TravelDetail from "./pages/TravelDetail";

function App() {
  return (
      <BrowserRouter future={{ v7_startTransition: true }}>
        <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/travel" element={<TravelList />} />
        <Route path="/travel/:id" element={<TravelDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
  );
}


export default App;
