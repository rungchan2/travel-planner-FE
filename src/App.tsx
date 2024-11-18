import "./App.css";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import {AuthProvider} from "@/lib/AuthContext.tsx";
import AppRoutes from "@/routes/AppRoutes.tsx";

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
