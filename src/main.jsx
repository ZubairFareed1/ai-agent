import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// PrimeReact theme (e.g., Lara Light theme)
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

// Core PrimeReact styles
import "primereact/resources/primereact.min.css";

// PrimeFlex for utility classes
import "primeflex/primeflex.css";

// PrimeIcons for icons
import "primeicons/primeicons.css";
import App from './App.jsx'
import './global.css'
import { ThemeProvider } from './ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
         <App />
    </ThemeProvider>
  </StrictMode>,
)