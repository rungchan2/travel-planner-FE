import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";
import Footer from "@/components/Footer.tsx";
import {AuthProvider} from "@/lib/AuthContext.tsx";
import AppRoutes from "@/routes/AppRoutes.tsx";
import {globalStyle} from "@/styles/globalStyle.ts";

function App() {

  return (
      <AuthProvider>
        <BrowserRouter future={{v7_startTransition: true}}>
          <NavBar/>
          <AppRoutes/>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
