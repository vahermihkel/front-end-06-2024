//import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Avaleht from './pages/Avaleht';
import Ostukorv from './pages/Ostukorv';
import LisaToode from './pages/LisaToode';
import HaldaTooteid from './pages/HaldaTooteid';
import Esindused from './pages/Esindused';
import Kinkekaart from './pages/Kinkekaart';
import Menyy from './components/Menyy';
import { useState } from 'react';
import MuudaToode from './pages/MuudaToode';
import YksEsindus from './pages/YksEsindus';
import YksToode from './pages/YksToode';
import Shops from './pages/Shops';
import { ContactUs } from './pages/ContactUs';

function App() {
  const [isDarkMode, setDarkMode] = useState(localStorage.getItem("dark-mode") === "true");

  const darkMode = (isDark) => {
    setDarkMode(isDark);
    localStorage.setItem("dark-mode", isDark)
  }

  return (
    <div className={isDarkMode ? "App-dark" : "App"}>
      <Menyy />
      <button onClick={() => darkMode(true)}>Dark</button>
      <button onClick={() => darkMode(false)}>Light</button>

    {/* path="eraklient"   localhost:3000/eraklient
        base-url'le järgnev     err.ee/eraklient   */}
      <Routes>
        <Route path="/" element={ <Navigate to="/avaleht" /> } />
        <Route path="avaleht" element={ <Avaleht /> } />
        <Route path="ostukorv" element={ <Ostukorv /> } />
        <Route path="lisa-toode" element={ <LisaToode /> } />
        <Route path="halda-tooteid" element={ <HaldaTooteid /> } />
        <Route path="esindused" element={ <Esindused /> } />
        <Route path="kinkekaardid" element={ <Kinkekaart /> } />
        <Route path="muuda-toode/:jrknr" element={ <MuudaToode /> } />
        <Route path="esindus/:index" element={ <YksEsindus /> } />
        <Route path="toode/:nimi" element={ <YksToode /> } />
        <Route path="poed" element={ <Shops /> } />
        <Route path="kontakteeru-meiega" element={ <ContactUs /> } />
        <Route path="*" element={ <div>404 - Not Found</div> } />
      </Routes>
    </div>
  );
}

export default App;
