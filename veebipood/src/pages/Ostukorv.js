import React, { useState } from 'react'
import { Link } from "react-router-dom"
import ostukorvJSON from "../data/ostukorv.json";

function Ostukorv() {
  const [ostukorv, setOstukorv] = useState(ostukorvJSON.slice());

  const tyhjenda = () => {
    ostukorvJSON.splice(0);
    setOstukorv(ostukorvJSON.slice());
  }

  const lisa = (toode) => {
    ostukorvJSON.push(toode);
    setOstukorv(ostukorvJSON.slice());
  }

  const kustuta = (index) => {
    ostukorvJSON.splice(index,1); // kustutamine
    setOstukorv(ostukorvJSON.slice()); // HTMLi uuendamine
  }

  const arvutaKokku = () => {
    let summa = 0;
    ostukorv.forEach(toode => summa += toode.hind);
    return summa;
  }

  return (
    <div>
      {ostukorv.length > 0 && <button onClick={tyhjenda}>Tühjenda</button>}
      {ostukorv.map((toode, index) => 
        <div key={index}>
          <img className="pilt" src={toode.pilt} alt="" />
          <div>{toode.nimi}</div>
          <div>{toode.hind}</div>
          <button onClick={() => lisa(toode)}>Lisa lõppu juurde</button>
          <button onClick={() => kustuta(index)}>Kustuta</button>
        </div>)}

      {ostukorv.length > 0 && <div>{arvutaKokku()}</div>}

      {ostukorv.length === 0 &&
        <>
          <div>Ostukorv on tühi. Lisa midagi: </div>
          <Link to="/avaleht">
            Avalehele
          </Link>
        </>}
    </div>
  )
}

export default Ostukorv