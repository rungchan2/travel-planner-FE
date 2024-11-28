import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ThemeProvider} from "@mui/material";
import {globalTheme} from "@/styles/globalTheme.tsx";

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={globalTheme}>
    <App />
  </ThemeProvider>
)
