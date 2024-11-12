import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Main from "./components/MainPage/Main.tsx";
import TravelList from "./components/TravelList";
import NavBar from "./components/NavBar";
import MyPage from "./components/MyPage";

function App() {
  return (
      <BrowserRouter future={{ v7_startTransition: true }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/travel" element={<TravelList />} />
          <Route path="/travel/:id" element={<TravelList />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
  );
}


export default App;
