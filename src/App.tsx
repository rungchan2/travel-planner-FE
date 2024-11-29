import "./App.css";
import NavBar from "./components/NavBar";
import {BrowserRouter} from "react-router-dom";
import AuthProvider from '@/lib/AuthProvider';
import AppRoutes from "@/routes/AppRoutes.tsx";

function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter future={ { v7_startTransition: true } }>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
