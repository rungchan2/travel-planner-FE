import "./App.css";
import NavBar from "./components/NavBar";
import { AuthProvider } from "@/lib/AuthContext.tsx";
import AppRoutes from "@/routes/AppRoutes.tsx";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
