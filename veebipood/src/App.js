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

function App() {
  return (
    <div className="App">
      <Menyy />

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
        <Route path="*" element={ <div>404 - Not Found</div> } />
      </Routes>
    </div>
  );
}

export default App;
