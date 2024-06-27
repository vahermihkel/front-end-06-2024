import React, { useState } from 'react'
import tallinnJSON from "../data/tallinn.json";
import { Link } from 'react-router-dom';

function Esindused() {
  //let keskus = "Narva";
  const [keskus, setKeskus] = useState("Tallinn");
  // const [tallinn, setTallinn] = useState(tallinnJSON);
  const tallinn = tallinnJSON;

  return (
    <div>
      <button className={keskus === "Tallinn" ? "keskus-aktiivne" : undefined} onClick={() => setKeskus("Tallinn")}>Tallinn</button>
      <button className={keskus === "Tartu" ? "keskus-aktiivne" : undefined} onClick={() => setKeskus("Tartu")}>Tartu</button>
      <button className={keskus === "Narva" ? "keskus-aktiivne" : undefined} onClick={() => setKeskus("Narva")}>Narva</button>
      <button className={keskus === "Pärnu" ? "keskus-aktiivne" : undefined} onClick={() => setKeskus("Pärnu")}>Pärnu</button>
      
      {keskus === "Tallinn" && 
        <div>
          {tallinn.map((t, i) => 
            <div key={t}>
              {t}
              <Link to={"/esindus/" + i}>
                <button>Vt lähemalt</button>
              </Link>
            </div>)}
        </div>}

      {
      keskus === "Tartu" &&
        <div>
          <div>Raatuse</div>
          <div>Lõunakeskus</div>
        </div>
      }

      {keskus === "Narva" && <div>Fama</div>}

      {keskus === "Pärnu" && <div>Port Artur 2</div>}
    </div>
  )
}

export default Esindused