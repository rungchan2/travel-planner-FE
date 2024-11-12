import "./App.css";
import Main from "./components/Main";
import MyPage from "./components/MyPage";
import NavBar from "./components/NavBar";
import TravelDetail from "./pages/TravelDetail";
import TravelList from "./pages/TravelList";
import { Route, Routes, BrowserRouter } from "react-router-dom";

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
